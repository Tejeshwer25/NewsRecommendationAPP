const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../Models/userModel");

// @desc    Register new user
// @route   POST /api/user/register
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, newsTopics } = await req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  // Check if user already exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  // Hash the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create a new user
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    newsTopics,
  });
  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      newsTopics: user.newsTopics,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("User could not be created");
  }
});

// @desc    Authenticate new user
// @route   POST /api/user/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Check if user exists
  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      newsTopics: user.newsTopics,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid credentials");
  }
});

// @desc    Get user data
// @route   GET /api/user/detail
// @access  Private
const getUserData = asyncHandler(async (req, res) => {
  const { _id, name, email, newsTopics } = await User.findById(req.user.id);

  res.status(200).json({
    id: _id,
    name,
    email,
    newsTopics,
  });
});

const changePassword = asyncHandler(async (req, res) => {
  const { id, oldPassword, newPassword } = req.body;
  const user = await User.findOne({ _id: id });

  if (user) {
    if (await bcrypt.compare(oldPassword, user.password)) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(newPassword, salt);
      await User.findByIdAndUpdate(id, { password: hashedPassword });
      res.status(200).json({
        message: "Password changed successfully",
      });
    } else throw new Error("Old password is incorrect");
  } else throw new Error("User does not exist");
});

const changeNewsTopics = asyncHandler(async (req, res) => {
  const { id, newTopics } = req.body;
  const user = await User.findOne({ _id: id });

  if (user) {
    try {
      await User.findByIdAndUpdate(id, { newsTopics: newTopics });
      res.status(200).json({
        message: "News topics changed successfully",
        topics: newTopics,
      });
    } catch (err) {
      throw new Error(err);
    }
  } else throw new Error("User does not exist");
});

// Generate JWT token
const generateToken = (userID) => {
  return jwt.sign({ userID }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

module.exports = {
  registerUser,
  loginUser,
  getUserData,
  changePassword,
  changeNewsTopics,
};
