const express = require("express");

// Controller functions
const { loginUser, registerUser, logoutUser } = require("../controllers/User");

// Middleware for validation
const {
  registerValidate,
  loginValidate,
} = require("../middleware/user.middleware");

const userRouter = express.Router();

// Routes
userRouter.post("/register", registerValidate, registerUser); // register route with validation
userRouter.post("/login", loginValidate, loginUser); // login route with validation
userRouter.get("/logout", logoutUser); // logout route

// Export router
module.exports = { userRouter };
