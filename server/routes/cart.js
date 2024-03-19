const express = require("express");
const router = express.Router();
// const { register, login } = require("../controllers/user");
const { addToCart, getCart, deleteCart } = require("../controllers/cart");

router.route("/").get(getCart);
router.route("/add").post(addToCart);
router.route("/delete/:id").delete(deleteCart);

module.exports = router;
