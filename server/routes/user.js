const express = require("express");
const router = express.Router();
const {
  register,
  login,
  verifyUser,
  getOrder,
  adminLogin,
  forgetPassword,
  changeResetPassword,
} = require("../controllers/user");

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/adminLogin").post(adminLogin);
router.route("/verify").get(verifyUser);
router.route("/orders").get(getOrder);
router.route("/forgetpassword/:email").get(forgetPassword);
router.route("/resetpassword").post(changeResetPassword);

module.exports = router;
