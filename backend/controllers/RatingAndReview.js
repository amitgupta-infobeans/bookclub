const { response } = require("../utils/response");
const { RatingAndReview } = require("../models/RatingAndReview");

const addReviewAndRating = async (req, res) => {
  try {
    const { userId, bookId } = req.body;
    let foundUser = await RatingAndReview.findOne({ userId, bookId });
    if (!foundUser) {
      let addRR = await RatingAndReview.create(req.body);
      response(res, 200, "Review and Rating added successfully.", "", addRR);
    } else {
      response(res, 400, "", "You have already added Review and Rating.");
    }
  } catch (e) {
    response(res, 400, "", e.message);
  }
};

const getReviewAndRating = async (req, res) => {
  try {
    const { id } = req.params;
    const ratingData = await RatingAndReview.find({ bookId: id })
      .populate({
        path: "bookId",
        select: "title _id description book_image",
      })
      .populate({ path: "userId", select: "name _id" });
    response(res, 200, "Okay", "", ratingData);
  } catch (e) {
    response(res, 400, "", e.message);
  }
};

module.exports = { addReviewAndRating, getReviewAndRating };
