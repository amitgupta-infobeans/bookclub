const { response } = require("../config/response");
const { User } = require("../models/User");

const loginUser = async (req, res) => {
  try {
    return response(res, 200, "Login success", "", []);
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
    return response(res, 200, "Logout successfully", "", []);
  } catch (e) {
    return response(res, 400, "Something went wrong.", e.message);
  }
};

module.exports = { loginUser, registerUser, logoutUser };
