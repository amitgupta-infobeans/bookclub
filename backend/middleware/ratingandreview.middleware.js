const { reviewAnRatingSchema } = require("../utils/ratingandreview.validation");
const { response } = require("../utils/response");

const validateReviewAndRating = async (req, res, next) => {
  try {
    await reviewAnRatingSchema.validate(req.body, { abortEarly: false });
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

module.exports = { validateReviewAndRating };
