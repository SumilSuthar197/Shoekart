const express = require("express");
const router = express.Router();
const { register, login } = require("../controllers/user");
// const Authentication = require("../middleware/auth");

// router.route("/dashboard").get(Authentication, dashboard);
router.route("/register").post(register);
router.route("/login").post(login);

module.exports = router;
