const express = require("express");
const {
  getAllUsers,
  getCoupons,
  createCoupon,
  deleteCoupon,
  getAllOrders,
  updateOrderStatus,
} = require("../controllers/admin");
const router = express.Router();

router.route("/users").get(getAllUsers);
router.route("/order").get(getAllOrders).put(updateOrderStatus);
router.route("/coupons").get(getCoupons).post(createCoupon);
router.route("/coupons/:id").delete(deleteCoupon);

module.exports = router;
