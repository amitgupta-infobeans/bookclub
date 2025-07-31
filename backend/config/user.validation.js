const yup = require("yup");

const userSchema = yup.object().shape({
  name: yup
    .string()
    .required("Name is required"),
  email: yup
    .string()
    .required("email is required")
    .email("Invalid email format"),
  password: yup
    .string()
    .required("password is required")
    .min(5, "Password should be 5 charcter long"),
  age: yup
    .number()
    .typeError("Age should be number")
    .positive("Age should be positive number"),
});

module.exports = { userSchema };
