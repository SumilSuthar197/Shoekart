const express = require("express");
const router = express.Router();
const {
  createProduct,
  getProducts,
  getFilterOptions,
  getProduct,
  updateReview,
  getFeaturedProducts,
  updateProduct,
} = require("../controllers/product");
const { verifyToken, adminOnly } = require("../middleware/auth");
const { getOptions } = require("../controllers/brands");
router.route("/featured").get(getFeaturedProducts);
router.route("/create").post(adminOnly, createProduct);
router.route("/update/:slug").put(adminOnly, updateProduct);
router.route("/filter").get(getProducts);
router.route("/filterOptions").get(getFilterOptions);
router.route("/review").put(verifyToken, updateReview);
router.route("/options").get(getOptions);
router.route("/:slug").get(getProduct);

module.exports = router;
