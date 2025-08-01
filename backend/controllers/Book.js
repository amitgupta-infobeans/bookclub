const { Book } = require("../models/Book");
const { response } = require("../utils/response");

const upload = require("../middleware/upload.middleware");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const addBook = async (req, res) => {
  try {
    let book = await Book.create(req.body);
    return response(res, 201, "Book Added", "", book);
  } catch (e) {
    return response(res, 400, "", e.message);
  }
};

const getBook = async (req, res) => {
  try {
    const { id } = req.params;
    let book = await Book.findById(id);
    return response(res, 200, "Okay", "", book);
  } catch (e) {
    return response(res, 400, "", e.message);
  }
};

const updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(req.body);
    let book = await Book.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (book) {
      return response(res, 200, "Okay", "", book);
    } else {
      return response(res, 400, "Something went wron", "book not updated..");
    }
  } catch (e) {
    return response(res, 400, "", e.message);
  }
};

const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;
    let book = await Book.findByIdAndDelete(id);
    if (book) {
      // book.book_image = "/uploads/fashion.jpg"
      const imagePath = path.join(__dirname, ".." + book.book_image);

      fs.unlink(imagePath, (err) => {
        if (err) {
          console.error(" Failed to delete image:", err.message);
        } else {
          console.log(" Image deleted successfully.");
        }
      });

      return response(res, 200, "Book Deleted Successfully");
    } else {
      return response(res, 400, "No book found for the given id.");
    }
  } catch (e) {
    return response(res, 400, "", e.message);
  }
};

const uploadBookImage = (req, res) => {
  upload.single("book_image")(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      return response(res, 400, "", err.message);
    } else if (err) {
      return response(res, 400, "", err.message);
    }
    if (!req.file) {
      return response(res, 400, "", "Image is required.");
    }

    return response(
      res,
      200,
      "Image uploaded successfully",
      "",
      `/uploads/${req.file.filename}`
    );
  });
};

module.exports = { addBook, deleteBook, updateBook, getBook, uploadBookImage };
