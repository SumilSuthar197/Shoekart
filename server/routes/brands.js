const express = require("express");
const {
  getAllBrands,
  createBrand,
  updateBrand,
} = require("../controllers/brands");
const router = express.Router();

router.route("/").get(getAllBrands).post(createBrand);
router.route("/:id").put(updateBrand);

module.exports = router;
