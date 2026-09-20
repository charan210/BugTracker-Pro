// =========================================================
// AUTH ROUTES
// =========================================================

const express = require("express");

const {
  registerUser,
  loginUser
} = require("../controllers/authController");

const router = express.Router();


// =========================================================
// REGISTER
// =========================================================

router.post("/register", registerUser);

router.post("/login", loginUser);


// =========================================================
// EXPORT
// =========================================================

module.exports = router;