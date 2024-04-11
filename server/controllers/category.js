const asyncErrorHandler = require("../middleware/asyncErrorHandler");
const errorHandler = require("../utils/errorHandler");
const category = require("../models/category");

const getCategory = asyncErrorHandler(async (req, res) => {
  const categories = await category.find();
  res.status(200).json({
    success: true,
    categories,
  });
});

const createCategory = asyncErrorHandler(async (req, res) => {
  const { name, description } = req.body;
  if (!name || !description) {
    next(new errorHandler("Please fill all the fields.", 400));
  }
  const existingCategory = await category.findOne({ name });
  if (existingCategory) {
    next(new errorHandler("Category already exists.", 400));
  }
  const newCategory = await category.create({ name, description });
  res.status(200).json({
    success: true,
    message: "Category created successfully.",
    category: newCategory,
  });
});

const updateCategory = asyncErrorHandler(async (req, res) => {
  const { name, description } = req.body;
  if (!name || !description) {
    next(errorHandler("Please fill all the fields.", 400));
  }
  await category.findByIdAndUpdate(req.params.id, { name, description });
  const categories = await category.find();
  res.status(200).json({
    success: true,
    message: "Category updated successfully.",
    categories,
  });
});

const deleteCategory = asyncErrorHandler(async (req, res) => {
  await category.findByIdAndDelete(req.params.id);
  const categories = await category.find();
  res.status(200).json({
    success: true,
    message: "Category deleted successfully.",
    categories,
  });
});

module.exports = {
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
};
