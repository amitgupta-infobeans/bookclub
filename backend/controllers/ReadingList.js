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
    let alreadyExist = await ReadingList.findOne({ userId });
    if (alreadyExist) {
      if (!alreadyExist.bookId.includes(bookId)) {
        alreadyExist.bookId.push(bookId);
        await alreadyExist.save();
        return response(
          res,
          200,
          "Added to existing Reading list.",
          "",
          alreadyExist
        );
      } else {
        return response(
          res,
          400,
          "",
          "already added to existing Reading list."
        );
      }
    } else {
      await ReadingList.create(req.body);
      return response(res, 200, "Added to Reading list.");
    }
  } catch (e) {
    return response(res, 400, "", e.message);
  }
};

const deleteReadingList = async (req, res) => {
  try {
    const { userId, bookId } = req.body;

    let foundUser = await ReadingList.findOne({ userId });

    if (foundUser) {
      const bookIdStr = bookId.toString(); // to handle ObjectId comparison

      // Check if book exists
      if (foundUser.bookId.map((id) => id.toString()).includes(bookIdStr)) {
        // Filter it out
        foundUser.bookId = foundUser.bookId.filter(
          (id) => id.toString() !== bookIdStr
        );

        await foundUser.save(); // ✅ Save the updated document

        return response(res, 200, "Successfully removed from reading list.");
      } else {
        return response(res, 400, "Book not found in reading list.");
      }
    } else {
      return response(res, 400, "User not found in reading list.");
    }
  } catch (e) {
    return response(res, 400, "", e.message);
  }
};

const getReadingList = async (req, res) => {
  try {
    const { id } = req.params; // or req.body or req.user if using auth
    const readingList = await ReadingList.find({ userId: id }).populate({
      path: "bookId",
      select: "title _id description book_image",
    }); // populates full book details
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
