const express = require("express");
const router = express.Router();
// const { register, login } = require("../controllers/user");
const {
  createProduct,
  getProducts,
  getFilterOptions,
  getProduct,
} = require("../controllers/product");
router.route("/create").post(createProduct);
router.route("/filter").get(getProducts);
router.route("/filterOptions").get(getFilterOptions);
router.route("/:slug").get(getProduct);

module.exports = router;
