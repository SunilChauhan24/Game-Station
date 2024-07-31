var express = require("express");
var router = express.Router();
const passport = require("passport");
const {
  registerHost,
  loginHost,
  getHosts,
  updateHost,
  deleteHost,
  logOut,
  forgotPassword,
  resetPassword,
  fetchOTP,
} = require("../../controller/host/hostController");

require("dotenv").config();

router.post("/register", registerHost);
router.post("/login", loginHost);
router.put("/update/:id", updateHost);
router.delete("/delete/:id", deleteHost);
router.get("/getHosts", getHosts);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
router.post("/fetchOtp", fetchOTP);

module.exports = router;
