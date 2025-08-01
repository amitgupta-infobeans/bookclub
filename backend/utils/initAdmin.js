const { User } = require("../models/User");
const mongoose = require("mongoose");
require("dotenv").config();

const initAdmin = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    const isAdminExist = await User.findOne({ email: process.env.ADMIN_EMAIL });

    if (isAdminExist) {
      console.log("ADMIN ALREADY EXISTS...");
      return;
    }
    const userObject = new User({
      name: "Admin",
      email: process.env.ADMIN_EMAIL,
      password: process.env.ADMIN_PASSWORD,
      role: "admin",
      age: 45,
    });
    await userObject.save();
    console.log("ADMIN USER IS CREATED SUCCESSFULLY...");
  } catch (e) {
    console.log("FAILED TO CREATE ADMIN USER:", e.message);
  }
};

module.exports = { initAdmin };
