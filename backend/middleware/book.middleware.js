const { isValidObjectId } = require("mongoose");
const { bookSchema } = require("../utils/book.validation");
const { response } = require("../utils/response");

const validateBookData = async (req, res, next) => {
  try {
    await bookSchema.validate(req.body, { abortEarly: false });
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

const validateId = async (req, res, next) => {
  try {
    let validId = await isValidObjectId(req.params.id);
    if (!validId) {
      return response(res, 400, "", "Invalid id provided.");
    }

    next();
  } catch (e) {
    return response(res, 400, "", e.message);
  }
};



module.exports = { validateBookData, validateId };
