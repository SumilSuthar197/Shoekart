const express = require("express");
const {
  getCategory,
  createCategory,
  updateCategory,
} = require("../controllers/category");
const { deleteCategory } = require("../controllers/category");
const router = express.Router();

router.route("/").get(getCategory).post(createCategory);
router.route("/:id").put(updateCategory).delete(deleteCategory);

module.exports = router;
