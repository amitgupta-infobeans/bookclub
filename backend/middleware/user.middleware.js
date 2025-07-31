const { userSchema } = require("../config/user.validation");
const { response } = require("../config/response");

const registerValidate = async (req, res, next) => {
  try {
    await userSchema.validate(req.body, { abortEarly: false });
    next();
  } catch (e) {
    return response(res, 400, "Error:", Array.isArray(e.errors) ? e.errors.join(", ") : "invalid type format..");
  }
};

module.exports = { registerValidate };
