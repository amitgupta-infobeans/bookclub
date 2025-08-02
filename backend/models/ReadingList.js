const mongoose = require("mongoose");
const { ref } = require("yup");
const { User } = require("./User");
const { Book } = require("./Book");

const readingListSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "userId is required field"],
    },
    bookId: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Book",
        required: [true, "bookId is required field"],
      },
    ],
  },
  { timestamps: true }
);

const ReadingList = new mongoose.model("ReadingList", readingListSchema);

module.exports = { ReadingList };
