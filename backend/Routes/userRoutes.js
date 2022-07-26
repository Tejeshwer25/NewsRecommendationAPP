const express = require("express");
const {
  registerUser,
  loginUser,
  getUserData,
  changePassword,
  changeNewsTopics,
} = require("../Controllers/userController.js");
const { protect } = require("../Middleware/authMiddleware.js");

const router = express.Router();

// Register Route
router.post("/register", registerUser);

// Login Route
router.post("/login", loginUser);

// Get User details
router.get("/detail", protect, getUserData);

// Change User Password
router.put("/changePassword", changePassword);

// Change User Topics
router.put("/updateTopics", changeNewsTopics);
module.exports = router;
