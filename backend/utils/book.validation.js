const yup = require("yup");

const bookSchema = yup.object().shape({
  title: yup.string().required("title is required"),
  description: yup.string().required("description is required"),
  book_image: yup.string().required("book image is required"),
});

module.exports = { bookSchema };
