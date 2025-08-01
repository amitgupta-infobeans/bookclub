const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "title is requried field"],
    },
    description: {
      type: String,
      required: [true, "description is required field"],
    },
    book_image: {
      type: String,
      required: [true, "book image is required field"],
    },
  },
  { timestamps: true }
);

const Book = new mongoose.model("Book", bookSchema);

module.exports = { Book };
