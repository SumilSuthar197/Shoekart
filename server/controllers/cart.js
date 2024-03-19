require("dotenv").config();
const user = require("../models/user");
const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;
const asyncErrorHandler = require("../middleware/asyncErrorHandler");
const errorHandler = require("../utils/errorHandler");
const Product = require("../models/product");

const getCart = asyncErrorHandler(async (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  if (!token) return next(new errorHandler("Token not found", 401));
  const { id } = jwt.verify(token, secret);
  const userObj = await user.findById(id).populate({
    path: "cart.items.productId",
    select: "name price image slug",
  });
  if (!userObj) {
    return next(new errorHandler("Invalid Token", 401));
  }
  return res.status(200).json(userObj.cart);
});

const addToCart = asyncErrorHandler(async (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const { productId, size, qty } = req.body;
  if (!token) return next(new errorHandler("Token not found", 401));
  const { id } = jwt.verify(token, secret);
  const userObj = await user.findById(id);

  if (!userObj) {
    return next(new errorHandler("Invalid Token", 401));
  }

  const productObj = await Product.findById(productId).select("price");
  if (!productObj) {
    return next(new errorHandler("Invalid Product id", 404));
  }
  
  const existingItem = userObj.cart.items.find(
    (item) => String(item.productId) === String(productId) && item.size === size
  );
  if (existingItem) {
    existingItem.qty += qty;
  } else {
    userObj.cart.items.push({ productId, size, qty });
  }
  userObj.cart.totalPrice += productObj.price * qty;
  await userObj.save();

  return res
    .status(200)
    .json({ message: "Product added to cart successfully" });
});

const deleteCart = asyncErrorHandler(async (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const _id = req.params.id;
  if (!token) return next(new errorHandler("Token not found", 401));
  const { id } = jwt.verify(token, secret);
  const userObj = await user.findById(id).populate({
    path: "cart.items.productId",
    select: "name price image slug",
  });

  if (!userObj) {
    return next(new errorHandler("Invalid Token", 401));
  }

  const itemToRemove = userObj.cart.items.find(
    (item) => String(item._id) === String(_id)
  );

  if (!itemToRemove) {
    return next(new errorHandler("Item not found in cart", 404));
  }

  userObj.cart.totalPrice -= itemToRemove.productId.price * itemToRemove.qty;

  userObj.cart.items = userObj.cart.items.filter(
    (item) => String(item._id) !== String(_id)
  );

  await userObj.save();
  return res.status(200).json({
    success: true,
    message: "Product removed from cart successfully",
    cart: userObj.cart,
  });
});

module.exports = { addToCart, getCart, deleteCart };
