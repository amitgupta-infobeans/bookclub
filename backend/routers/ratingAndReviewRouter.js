const express = require("express");
const { isValidId } = require("../middleware/readinglist.middleware");
const {addReviewAndRating, getReviewAndRating} = require("../controllers/RatingAndReview");
const { validateId } = require("../middleware/book.middleware");
const {validateReviewAndRating} = require("../middleware/ratingandreview.middleware")


const ratingAndReviewRouter = express.Router();

ratingAndReviewRouter.post("/", isValidId, validateReviewAndRating, addReviewAndRating);
ratingAndReviewRouter.get("/:id", validateId, getReviewAndRating);

module.exports = { ratingAndReviewRouter };
