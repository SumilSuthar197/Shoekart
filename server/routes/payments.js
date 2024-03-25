const express = require("express");
const { checkout } = require("../controllers/payments");
const router = express.Router();

router.route("/create-checkout-session").post(checkout);

module.exports = router;
