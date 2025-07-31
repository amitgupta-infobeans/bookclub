const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    age: {
      type: Number,
      required: [true, "Age is required "],
    },
    email: {
      type: String,
      required: [true, "Email is required..."],
      unique: [true, "email should be unique"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
  },
  { timestamps: true }
);

// pre save middleware:
userSchema.pre("save", async function (next) {
  try {
    this.password = await bcrypt.hash(this.password, 10);
  } catch (e) {
    next(e);
  }

  next();
});

const User = mongoose.model("User", userSchema);

module.exports = { User };
