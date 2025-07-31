const express = require("express");
const { loginUser, registerUser, logoutUser } = require("../controllers/User");
const { registerValidate } = require("../middleware/user.middleware");
const userRouter = express.Router();

userRouter.post("/register", registerValidate, registerUser);
userRouter.post("/login", loginUser);
userRouter.post("/logout", logoutUser);

module.exports = { userRouter };
