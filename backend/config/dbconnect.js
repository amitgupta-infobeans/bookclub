const mongoose = require("mongoose");
const connectDB = async () => {
  try {
    const db = await mongoose.connect(process.env.DB_URL);
    console.log("Connected with DB...");
  } catch (e) {
    console.log("Something went wrong to connect with DB", e.message);
    process.exit(1);
  }
};

module.exports = { connectDB };