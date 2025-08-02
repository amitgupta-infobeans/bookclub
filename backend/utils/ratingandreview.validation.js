const yup = require("yup");

const reviewAnRatingSchema = yup.object().shape({
  userId: yup.string().required("userId is required"),
  bookId: yup.string().required("bookId is required"),
  rating: yup
    .number()
    .typeError("rating should be an integer")
    .positive("rating should be a positive number")
    .required("rating is required").max(5, "rating should not be greater than 5."),
  review: yup.string().required("review is required"),
});

module.exports = { reviewAnRatingSchema };
