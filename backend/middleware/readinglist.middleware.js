const { isValidObjectId } = require("mongoose");
const { userIdAndBookIdSchema } = require("../utils/readinglist.validation");
const { response } = require("../utils/response");

const validateUserAndBookId = async (req, res, next) => {
  try {
    await userIdAndBookIdSchema.validate(req.body, { abortEarly: false });
    next();
  } catch (e) {
    return response(
      res,
      400,
      "validation failed",
      Array.isArray(e.errors) ? e.errors.join(", ") : "invalid type format.."
    );
  }
};


const isValidId = async (req, res, next) => {
  try {
    const { userId, bookId } = req.body;
    let validUserId = await isValidObjectId(userId);
    let validBookId = await isValidObjectId(bookId);
    if (!validUserId || !validBookId) {
      return response(res, 400, "", "Invalid book or user id provided.");
    }

    next();
  } catch (e) {
    return response(res, 400, "", e.message);
  }
};

module.exports = { validateUserAndBookId, isValidId };
