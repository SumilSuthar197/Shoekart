const user = require("../models/user");
const asyncErrorHandler = require("../middleware/asyncErrorHandler");
const errorHandler = require("../utils/errorHandler");
const order = require("../models/order");
const product = require("../models/product");
const Stripe = require("stripe");
const brands = require("../models/brands");
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

const getAllUsers = asyncErrorHandler(async (req, res) => {
  const users = await user
    .find({ role: "user" })
    .select("name email createdAt");
  const maxIndex = Math.max(users.length, 100);
  const usersWithFormattedDate = users.map((user) => ({
    ...user._doc,
    createdAt: new Date(user.createdAt).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }),
    index: `#${(users.indexOf(user) + 1)
      .toString()
      .padStart(maxIndex.toString().length, "0")}`,
  }));
  res.status(200).json({
    success: true,
    users: usersWithFormattedDate,
  });
});

const getAllOrders = asyncErrorHandler(async (req, res) => {
  console.log("orders");
  const { page, limit } = req.query;
  const orders = await order
    .find()
    .populate({
      path: "userId",
      select: "name",
    })
    .populate({
      path: "products.productId",
      select: "name price brand image slug color",
    })
    .select("user products createdAt delivery_status total paymentIntentId")
    .sort("-createdAt")
    .skip((page - 1) * limit)
    .limit(limit);

  const count = await order.countDocuments();
  const ordersWithFormattedDate = orders.map((order) => ({
    _id: order._id,
    user: order.userId.name,
    products: order.products.map((product) => ({
      _id: product._id,
      name: `${product.productId.brand} ${product.productId.name}`,
      desc: `${product.productId.color}, UK ${product.size}, ${product.quantity} unit`,
      image: product.productId.image,
      slug: product.productId.slug,
    })),
    total: order.total,
    delivered: order.delivery_status,
    paymentId: order.paymentIntentId,
    createdAt: new Date(order.createdAt).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }),
  }));
  res.status(200).json({
    success: true,
    orders: ordersWithFormattedDate,
    count,
  });
});

const updateOrderStatus = asyncErrorHandler(async (req, res) => {
  const { id, status, paymentId } = req.body;
  await order.findByIdAndUpdate(id, { delivery_status: status });
  if (status === "Cancelled") {
    await stripe.refunds.create({ payment_intent: paymentId });
  }

  res.status(200).json({
    success: true,
    message: "Order status updated successfully.",
  });
});

const getCoupons = asyncErrorHandler(async (req, res) => {
  const coupons = await stripe.coupons.list({
    limit: 100,
  });
  data = coupons.data.map((coupon) => ({
    id: coupon.id,
    percent_off: coupon.percent_off,
    duration:
      coupon.duration == "repeating"
        ? coupon.duration_in_months
        : coupon.duration,
    duration_in_months: coupon.duration_in_months,
    max_redemptions: coupon.max_redemptions || 999,
    redemption_left: `${coupon.times_redeemed}/${
      coupon.max_redemptions || "∞"
    }`,
  }));

  res.status(200).json({
    success: true,
    data,
  });
});

const createCoupon = asyncErrorHandler(async (req, res) => {
  const {
    name,
    discount: percent_off,
    duration,
    duration_in_months,
    max_redemptions,
  } = req.body.formData;
  const couponData = {
    id: name.toUpperCase(),
    name: name.toUpperCase(),
    duration: duration === "forever" ? "forever" : "repeating",
    percent_off,
    max_redemptions,
  };

  if (duration !== "forever") {
    couponData.duration_in_months = duration_in_months;
  }

  await stripe.coupons.create(couponData);
  res.status(200).json({
    success: true,
    message: "Coupon created successfully.",
  });
});

const deleteCoupon = asyncErrorHandler(async (req, res) => {
  await stripe.coupons.del(req.params.id);
  res.status(200).json({
    success: true,
    message: "Coupon deleted successfully.",
  });
});

const getAllProducts = asyncErrorHandler(async (req, res) => {
  const { page, limit, searchTerm } = req.query;
  const products = await product
    .find({ name: { $regex: searchTerm, $options: "i" } })
    .skip((page - 1) * limit)
    .limit(limit)
    .sort("brand name");

  const count = await product.countDocuments({
    name: { $regex: searchTerm, $options: "i" },
  });

  const formattedList = products.map((product) => ({
    _id: product._id,
    image: product.image,
    name: product.name,
    desc: `${(product.ratingScore / product.ratings.length || 0).toFixed(
      1
    )} stars, ${product.color}`,
    size: product.sizeQuantity
      .map((size) => `${size.size} (${size.quantity} unit)`)
      .join(", "),
    brand: product.brand,
    status: product.isActive ? "Active" : "Inactive",
    price: product.price,
    slug: product.slug,
  }));
  res.status(200).json({
    success: true,
    count,
    products: formattedList,
  });
});

const productStatus = asyncErrorHandler(async (req, res) => {
  const currentProduct = await product.findById(req.params.id);
  const productBrand = await brands.findOne({ name: currentProduct.brand });
  productBrand.activeProducts += currentProduct.isActive ? -1 : 1;
  currentProduct.isActive = !currentProduct.isActive;
  await currentProduct.save();
  await productBrand.save();
  res.status(200).json({
    success: true,
    message: "Product status updated successfully.",
  });
});

const getAdminDetails = asyncErrorHandler(async (req, res) => {
  const label1 = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const data1 = [];
  const label2 = ["Pending", "Delivered", "Cancelled"];
  const data2 = [];
  const now = new Date();
  const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const firstDayOfNextMonth = new Date(
    now.getFullYear(),
    now.getMonth() + 1,
    1
  );
  const ordersData = await order.aggregate([
    {
      $match: {
        createdAt: { $gte: new Date(new Date().getFullYear(), 0, 1) },
      },
    },
    {
      $group: {
        _id: { $month: "$createdAt" },
        totalSales: { $sum: "$total" },
        count: { $sum: 1 },
      },
    },
    {
      $sort: { _id: 1 },
    },
  ]);

  Array.from({ length: 12 }, (_, i) => {
    const monthData = ordersData.find((data) => data._id === i + 1);
    if (monthData) {
      data1.push(Number(monthData.totalSales).toFixed(2));
    } else {
      data1.push(0);
    }
  });

  const orderUpdate = await order.aggregate([
    {
      $match: {
        createdAt: {
          $gt: firstDayOfMonth,
          $lte: firstDayOfNextMonth,
        },
      },
    },
    {
      $group: {
        _id: "$delivery_status",
        count: { $sum: 1 },
      },
    },
  ]);

  label2.forEach((status) => {
    const matchingOrderUpdate = orderUpdate.find(
      (data) => data._id.toLowerCase() === status.toLowerCase()
    );

    if (matchingOrderUpdate) {
      data2.push(matchingOrderUpdate.count);
    } else {
      data2.push(0);
    }
  });
  const totalUsers = await user.countDocuments({ role: "user" });
  const totalOrders = await order.countDocuments();
  const totalProducts = await product.countDocuments();
  const totalSales = await order.aggregate([
    {
      $group: {
        _id: null,
        total: { $sum: "$total" },
      },
    },
  ]);
  res.status(200).json({
    success: true,
    bar1: { labels: label1, data: data1 },
    bar2: { labels: label2, data: data2 },
    totalUsers,
    totalOrders,
    totalProducts,
    totalSales: totalSales[0].total.toFixed(2),
  });
});
module.exports = {
  getAllUsers,
  getCoupons,
  createCoupon,
  deleteCoupon,
  getAllOrders,
  updateOrderStatus,
  getAllProducts,
  productStatus,
  getAdminDetails,
};
