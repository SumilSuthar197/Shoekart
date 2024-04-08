const user = require("../models/user");
const asyncErrorHandler = require("../middleware/asyncErrorHandler");
const errorHandler = require("../utils/errorHandler");
const order = require("../models/order");
const Stripe = require("stripe");
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
module.exports = {
  getAllUsers,
  getCoupons,
  createCoupon,
  deleteCoupon,
  getAllOrders,
  updateOrderStatus,
};
