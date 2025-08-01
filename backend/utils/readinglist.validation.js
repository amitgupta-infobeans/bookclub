const yup = require("yup");

const userIdAndBookIdSchema = yup.object().shape({
  userId: yup.string().required("userId is required"),
  bookId: yup.string().required("bookId is required"),
});

module.exports = { userIdAndBookIdSchema };
