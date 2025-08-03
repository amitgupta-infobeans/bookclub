const { Book } = require("../models/Book");
const { response } = require("../utils/response");

const searchBookTitle = async (req, res) => {
  try {
    const { title } = req.query;
    const searchResult = await Book.find({
      title: { $regex: title, $options: "i" },
    })
      .populate("title")
      .limit(process.env.BOOK_LIMIT);
    response(res, 200, "Book title fetched", "", searchResult);
  } catch (e) {
    response(res, 400, "", e.message);
  }
};

const searchAllBooks = async (req, res) => {
  try {
    const { limit = 10, offset = 0 } = req.query;
    const searchResult = await Book.find()
      .limit(parseInt(limit))
      .skip(parseInt(offset));

    // send total books counts in api..
    const countBooks = await Book.countDocuments();

    response(res, 200, "Books fetched", "", searchResult, countBooks);
  } catch (e) {
    response(res, 400, "", e.message);
  }
};

module.exports = { searchBookTitle, searchAllBooks };
