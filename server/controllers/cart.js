const user = require("../models/user");
const asyncErrorHandler = require("../middleware/asyncErrorHandler");
const errorHandler = require("../utils/errorHandler");
const Product = require("../models/product");

const getCart = asyncErrorHandler(async (req, res, next) => {
  const userObj = await user.findById(req.tokenId).populate({
    path: "cart.items.productId",
    select: "name price brand image slug",
  });
  if (!userObj) {
    return next(new errorHandler("Invalid Token", 401));
  }
  return res.status(200).json(userObj.cart);
});

const addToCart = asyncErrorHandler(async (req, res, next) => {
  const id = req.tokenId;
  const { productId, size, qty } = req.body;
  const userObj = await user.findById(id);

  if (!userObj) {
    return next(new errorHandler("Invalid Token", 401));
  }

  const productObj = await Product.findById(productId).select(
    "price sizeQuantity"
  );
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
  const id = req.tokenId;
  const _id = req.params.id;
  const userObj = await user.findById(id).populate({
    path: "cart.items.productId",
    select: "name price brand image slug",
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

const updateCart = asyncErrorHandler(async (req, res, next) => {
  const { cartId } = req.params;
  const { qty } = req.body;
  const id = req.tokenId;
  const userObj = await user.findById(id).populate({
    path: "cart.items.productId",
    select: "name price brand image slug",
  });

  if (!userObj) {
    return next(new errorHandler("Invalid Token", 401));
  }

  const itemToUpdate = userObj.cart.items.id(cartId);
  if (!itemToUpdate) {
    return next(new errorHandler("Item not found in cart", 404));
  }
  if (itemToUpdate.qty === qty) {
    return res.status(200).json({ message: "Cart updated successfully" });
  }
  const productPrice = await Product.findById(itemToUpdate.productId).select(
    "price"
  );
  if (!productPrice) {
    return next(new errorHandler("Invalid Product id", 404));
  }

  if (qty <= 0) {
    userObj.cart.totalPrice -= itemToUpdate.qty * productPrice.price;
    userObj.cart.items = userObj.cart.items.filter(
      (item) => String(item._id) !== String(cartId)
    );
  } else {
    userObj.cart.totalPrice -= itemToUpdate.qty * productPrice.price;
    itemToUpdate.qty = qty;
    userObj.cart.totalPrice += itemToUpdate.qty * productPrice.price;
  }

  await userObj.save();

  return res.status(200).json({
    message: "Product added to cart successfully",
    cart: userObj.cart,
  });
});

module.exports = { addToCart, getCart, deleteCart, updateCart };
