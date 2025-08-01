const { response } = require("../utils/response");
const { User } = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const ms = require("ms");

require("dotenv").config();

const expiresIn = process.env.EXPIRED_IN;

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    let isEmailValid = await User.findOne({ email: email });
    if (!isEmailValid) {
      return response(res, 400, "", "invalid email provided");
    }
    // hash password by bcryptjs
    let hashPassword = await bcrypt.compare(password, isEmailValid.password);
    if (!hashPassword) {
      return response(res, 400, "", "invalid password provided");
    }

    // set JWT token in cookies:
    let token = jwt.sign({ user: isEmailValid }, process.env.JWT_SECRET_KEY, {
      expiresIn,
    });
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "strict",
      maxAge: ms(expiresIn),
    });

    isEmailValid = isEmailValid.toObject();
    delete isEmailValid.password;
    return response(res, 200, "Login success", "", isEmailValid);
  } catch (e) {
    return response(res, 400, "Something went wrong.", e.message);
  }
};

const registerUser = async (req, res) => {
  try {
    let registeredUser = await User.create(req.body);
    registeredUser = registeredUser.toObject();
    delete registeredUser.password;
    return response(res, 200, "User registered.", "", registeredUser);
  } catch (e) {
    return response(res, 400, "", e.message);
  }
};

const logoutUser = async (req, res) => {
  try {
    res.clearCookie("token");
    return response(res, 200, "Logout successfully", "", []);
  } catch (e) {
    return response(res, 400, "Something went wrong.", e.message);
  }
};

module.exports = { loginUser, registerUser, logoutUser };
