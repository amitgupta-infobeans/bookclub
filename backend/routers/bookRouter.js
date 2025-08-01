const express = require("express");
const {
  addBook,
  getBook,
  updateBook,
  uploadBookImage,
  deleteBook,
} = require("../controllers/Book");
const {
  validateBookData,
  validateId,
} = require("../middleware/book.middleware");


const bookRouter = express.Router();

bookRouter.route("/:id").get(validateId, getBook).delete(validateId, deleteBook);
bookRouter.post("/", validateBookData, addBook);
bookRouter.patch("/:id", validateId, validateBookData, updateBook);
bookRouter.post("/uploads",  uploadBookImage);

module.exports = { bookRouter };
