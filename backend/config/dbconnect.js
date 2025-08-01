const mongoose = require("mongoose");
const { initAdmin } = require("../utils/initAdmin");
const connectDB = async () => {
  try {
    const db = await mongoose.connect(process.env.DB_URL);
    await initAdmin();
    console.log("Connected with DB...");
  } catch (e) {
    console.log("Something went wrong to connect with DB", e.message);
    process.exit(1);
  }
};

module.exports = { connectDB };
