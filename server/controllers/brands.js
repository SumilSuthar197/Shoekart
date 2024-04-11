const asyncErrorHandler = require("../middleware/asyncErrorHandler");
const errorHandler = require("../utils/errorHandler");
const brand = require("../models/brands");
const category = require("../models/category");

const getAllBrands = asyncErrorHandler(async (req, res) => {
  const brands = await brand.find();
  res.status(200).json({
    success: true,
    brands,
  });
});

const createBrand = asyncErrorHandler(async (req, res, next) => {
  console.log(req.body);
  const { name, description, email, isActivate } = req.body;
  if (!name || !description || !email) {
    next(new errorHandler("Please fill all the fields.", 400));
  }
  const existingBrand = await brand.findOne({ name });
  if (existingBrand) {
    next(new errorHandler("Brand already exists.", 400));
  }
  const newBrand = await brand.create({
    name: name.charAt(0).toUpperCase() + name.slice(1).toLowerCase(),
    description,
    email,
    isActivate,
  });
  res.status(200).json({
    success: true,
    message: "Brand created successfully.",
    brand: newBrand,
  });
});

const updateBrand = asyncErrorHandler(async (req, res) => {
  const { name, description, email, isActivate } = req.body;
  if (!name || !description || !email) {
    next(errorHandler("Please fill all the fields.", 400));
  }
  await brand.findByIdAndUpdate(req.params.id, {
    name,
    description,
    email,
    isActivate,
  });
  const brands = await brand.find();
  res.status(200).json({
    success: true,
    message: "Brand updated successfully.",
    brands,
  });
});

const getOptions = asyncErrorHandler(async (req, res) => {
  const brands = await brand.find();
  const brandOptions = brands.map((brand) => brand.name);
  const categories = await category.find();
  const categoryOptions = categories.map((category) => category.name);

  res.status(200).json({
    success: true,
    brandOptions,
    categoryOptions,
  });
});

module.exports = {
  getAllBrands,
  createBrand,
  updateBrand,
  getOptions,
};
