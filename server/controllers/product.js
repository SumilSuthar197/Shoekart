require("dotenv").config();
const product = require("../models/product");
const asyncErrorHandler = require("../middleware/asyncErrorHandler");
const errorHandler = require("../utils/errorHandler");
const order = require("../models/order");
const user = require("../models/user");

const getAllProducts = asyncErrorHandler(async (req, res, next) => {
  const products = await product.find({});
  res.status(200).json({
    success: true,
    products,
  });
});

const getProducts = asyncErrorHandler(async (req, res, next) => {
  const page = parseInt(req.query.page) - 1 || 0;
  const limit = parseInt(req.query.limit) || 12;
  const search = req.query.search || "";
  const sortParam = req.query.sortBy.value || "createdAt_asc";
  const colors = req.query.color;
  const sizes = req.query.size;
  const priceRange = req.query.price;

  const query = {
    name: { $regex: search, $options: "i" },
    price: {
      $gte: parseInt(priceRange.minPrice) || 0,
      $lte: parseInt(priceRange.maxPrice) || Infinity,
    },
    isActive: true,
  };

  if (colors && colors.length > 0) {
    query.color = { $in: colors.map((color) => new RegExp(`^${color}$`, "i")) };
  }

  if (sizes && sizes.length > 0) {
    query["sizeQuantity.size"] = { $in: sizes.map(Number) };
  }

  let sortField = "createdAt";
  let sortOrder = 1;

  if (sortParam) {
    const [field, order] = sortParam.split("_");
    if (field) {
      sortField = field;
    }
    if (order && order.toLowerCase() === "desc") {
      sortOrder = -1;
    }
  }

  const products = await product
    .find(query)
    .sort({ [sortField]: sortOrder })
    .skip(page * limit)
    .limit(limit);

  const colorOptions = await product.distinct("color");
  const brandOptions = await product.distinct("brand");
  const total = await product.countDocuments(query);

  res.status(200).json({
    success: true,
    count: total,
    products,
    colorOptions,
    brandOptions,
  });
});

const getProduct = asyncErrorHandler(async (req, res, next) => {
  const { slug } = req.params;

  const productExists = await product.findOne({ slug, isActive: true });
  if (!productExists) {
    return next(new errorHandler("No such product exist", 404));
  }

  return res.status(200).json({
    success: true,
    data: productExists,
  });
});

const createProduct = asyncErrorHandler(async (req, res, next) => {
  const {
    sku,
    name,
    brand,
    image,
    description,
    price,
    sizeQuantity,
    color,
    material,
    isActive,
  } = req.body;

  if (
    !sku ||
    !name ||
    !brand ||
    !image ||
    !description ||
    !price ||
    !color ||
    !material ||
    !isActive ||
    !sizeQuantity
  ) {
    return next(new errorHandler("Please fill all fields", 400));
  }

  const productExists = await product.findOne({ sku });
  if (productExists) {
    return next(new errorHandler("Product already exists", 400));
  }

  await product.create({
    sku,
    name,
    brand,
    image,
    description,
    price,
    sizeQuantity,
    color,
    material,
    isActive,
  });

  res.status(201).json({
    success: true,
    message: "Product created successfully",
  });
});

const getFilterOptions = asyncErrorHandler(async (req, res, next) => {
  const colors = await product.distinct("color");
  const brands = await product.distinct("brand");

  res.status(200).json({
    success: true,
    colors,
    brands,
  });
});

const updateReview = asyncErrorHandler(async (req, res, next) => {
  console.log("called");
  const id = req.tokenId;
  const { rating, review, productId, orderId } = req.body;
  const userObj = await user.findById(id).select("name");
  if (!userObj) {
    return next(new errorHandler("Invalid Token", 401));
  }
  const productObj = await product.findById(productId);
  if (!productObj) {
    return next(new errorHandler("Invalid Product id", 404));
  }
  productObj.ratings.push({ rating, review, name: userObj.name });
  productObj.ratingScore += rating;
  await productObj.save();

  const orderObj = await order.findById(orderId);
  orderObj.products = orderObj.products.map((item) => {
    if (String(item.productId) === String(productId)) {
      item.isReviewed = true;
    }
    return item;
  });
  await orderObj.save();
  return res.status(200).json({
    success: true,
    message: "Review added successfully",
  });
});

const getFeaturedProducts = asyncErrorHandler(async (req, res, next) => {
  const featured = await product
    .find({ isActive: true, isFeatured: true })
    .limit(8);
  const trending = await product
    .find({ isActive: true })
    .sort({ price: 1 })
    .limit(4);
  res.status(200).json({
    success: true,
    featured,
    trending,
  });
});
module.exports = {
  createProduct,
  getProducts,
  getProduct,
  getFilterOptions,
  updateReview,
  getFeaturedProducts,
};
