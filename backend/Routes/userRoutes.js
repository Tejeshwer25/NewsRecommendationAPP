const express = require("express");
const {
  registerUser,
  loginUser,
  getUserData,
} = require("../Controllers/userController.js");
const { protect } = require("../Middleware/authMiddleware.js");

const router = express.Router();

// Register Route
router.post("/register", registerUser);

// Login Route
router.post("/login", loginUser);

// Get User details
router.get("/detail", protect, getUserData);

module.exports = router;
