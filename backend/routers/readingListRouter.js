const express = require("express");
const { validateId } = require("../middleware/book.middleware");
const {
  isValidId,
  validateUserAndBookId,
} = require("../middleware/readinglist.middleware");
const {
  addReadingList,
  deleteReadingList,
  getReadingList,
} = require("../controllers/ReadingList");
const readingListRouter = express.Router();

readingListRouter.post("/", validateUserAndBookId, isValidId, addReadingList);
readingListRouter.delete(
  "/",
  validateUserAndBookId,
  isValidId,
  deleteReadingList
);
readingListRouter.get("/:id", validateId, getReadingList); // get all reading list of user (id = user_id)

module.exports = { readingListRouter };
