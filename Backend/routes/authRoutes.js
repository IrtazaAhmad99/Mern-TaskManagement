const express = require("express");
const router = express.Router();

const AuthController = require("../controllers/Auth/AuthController.js");


router.post("/signup", AuthController.signup);

router.post("/verify-otp", AuthController.verifyOTP);

router.post("/login", AuthController.login);

module.exports = router;