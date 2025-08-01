const { response } = require("../utils/response");
const { ReadingList } = require("../models/ReadingList");
const { User } = require("../models/User");
const { Book } = require("../models/Book");

const addReadingList = async (req, res) => {
  try {
    const { userId, bookId } = req.body;
    let isValidUser = await User.findById({ _id: userId });
    let isValidBook = await Book.findById({ _id: bookId });
    if (!isValidUser || !isValidBook) {
      return response(
        res,
        400,
        "",
        "invalid userId or bookId that doesn't match to DB."
      );
    }
    let alreadyExist = await ReadingList.findOne({ userId, bookId });
    if (alreadyExist) {
      return response(res, 200, "", "already added to reading list.");
    }
    let success = await ReadingList.create(req.body);
    return response(res, 200, "Added to Reading list.");
  } catch (e) {
    return response(res, 400, "", e.message);
  }
};

const deleteReadingList = async (req, res) => {
  try {
    const { userId, bookId } = req.body;
    let success = await ReadingList.findOneAndDelete({ userId, bookId });
    if (success) {
      return response(res, 200, "Successfully removed from reading list.");
    } else {
      return response(res, 400, "Entry not found in reading list.");
    }
  } catch (e) {
    return response(res, 400, "", e.message);
  }
};

const getReadingList = async (req, res) => {
  try {
    const { id } = req.params; // or req.body or req.user if using auth
    const readingList = await ReadingList.find({ userId: id }).populate(
      "bookId"
    ); // populates full book details
    if (readingList.length > 0) {
      return response(res, 200, "User reading list fetched", "", readingList);
    } else {
      return response(res, 400, "", "Entry not found in reading list.", []);
    }
  } catch (e) {
    return response(res, 400, "", e.message);
  }
};

module.exports = { addReadingList, deleteReadingList, getReadingList };
