const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../Models/userModel");

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.userID).select("-password");

      console.log(req.user);

      next();
    } catch (err) {
      console.log(err);
      res
        .status(401)
        .json({ error: "You are not authorized to access this resource" });
    }
  }

  if (!token) {
    res
      .status(401)
      .json({ error: "You are not authorized to access this resource" });
  }
});

module.exports = { protect };
