const express = require("express");
const router = express.Router();
const {
  createProduct,
  getProducts,
  getFilterOptions,
  getProduct,
  updateReview,
} = require("../controllers/product");
const { verifyToken } = require("../middleware/auth");
router.route("/create").post(createProduct);
router.route("/filter").get(getProducts);
router.route("/filterOptions").get(getFilterOptions);
router.route("/:slug").get(getProduct);
router.route("/review").put(verifyToken, updateReview);

module.exports = router;
