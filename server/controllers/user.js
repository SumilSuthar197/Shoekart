require("dotenv").config();
const user = require("../models/user");
const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;
const asyncErrorHandler = require("../middleware/asyncErrorHandler");
const errorHandler = require("../utils/errorHandler");

const register = asyncErrorHandler(async (req, res, next) => {
  const { name, email, password } = req.body;

  const emailAlreadyExists = await user.findOne({ email });
  if (emailAlreadyExists) {
    return next(new errorHandler("Email already exists", 400));
  }

  if (!name || !email || !password) {
    return next(new errorHandler("Please fill all fields", 400));
  }

  await user.create({
    name,
    email,
    password,
  });

  res.status(201).json({
    success: true,
    message: "User registered successfully",
  });
});

const login = asyncErrorHandler(async (req, res, next) => {
  const { email, password, role } = req.body;

  if (!email || !password) {
    return next(new errorHandler("Please provide email and password", 400));
  }

  const userExists = await user.findOne({ email, role });
  if (!userExists) {
    return next(new errorHandler("Invalid credentials", 401));
  }

  const isMatch = await userExists.comparePassword(password);
  if (!isMatch) {
    return next(new errorHandler("Invalid credentials", 401));
  }
  const token = jwt.sign(
    { id: userExists._id, email: userExists.email },
    secret,
    {
      expiresIn: "30d",
    }
  );

  const cartSize = userExists.cart.items.reduce((a, p) => {
    return a + p.qty;
  }, 0);
  res.status(200).json({
    success: true,
    message: "User logged in successfully",
    user: {
      name: userExists.name,
      email: userExists.email,
      cartSize,
    },
    token,
  });
});

const verifyUser = asyncErrorHandler(async (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  if (!token) return next(new errorHandler("Token not found", 401));
  const { id } = jwt.verify(token, secret);
  const userObj = await user.findById(id);
  if (!userObj) {
    return next(new errorHandler("Invalid Token", 401));
  }
  const cartSize = userObj.cart.items.reduce((a, p) => {
    return a + p.qty;
  }, 0);
  res.status(200).json({
    success: true,
    user: {
      name: userObj.name,
      email: userObj.email,
      cartSize,
    },
  });
});
module.exports = {
  register,
  login,
  verifyUser,
};
