const express = require("express");
const router = express.Router();
// const { register, login } = require("../controllers/user");
const {
  createProduct,
  getProducts,
  getFilterOptions,
} = require("../controllers/productController");
router.route("/create").post(createProduct);
router.route("/filter").get(getProducts);
router.route("/filterOptions").get(getFilterOptions);

module.exports = router;
