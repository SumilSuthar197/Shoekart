const express = require("express");
const router = express.Router();
const {
  register,
  login,
  verifyUser,
  getOrder,
  adminLogin,
} = require("../controllers/user");
// const Authentication = require("../middleware/auth");

// router.route("/dashboard").get(Authentication, dashboard);
router.route("/register").post(register);
router.route("/login").post(login);
router.route("/adminLogin").post(adminLogin);
router.route("/verify").get(verifyUser);
router.route("/orders").get(getOrder);

module.exports = router;
