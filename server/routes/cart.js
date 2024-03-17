const express = require("express");
const router = express.Router();
// const { register, login } = require("../controllers/user");
const { addToCart, getCart } = require("../controllers/cart");

router.route("/add").post(addToCart);
router.route("/").get(getCart);

module.exports = router;
