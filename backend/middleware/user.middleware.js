const { userSchema, userLoginSchema } = require("../utils/user.validation");
const { response } = require("../utils/response");

const registerValidate = async (req, res, next) => {
  try {
    await userSchema.validate(req.body, { abortEarly: false });
    next();
  } catch (e) {
    return response(
      res,
      400,
      "validation failed:",
      Array.isArray(e.errors) ? e.errors.join(", ") : "invalid type format.."
    );
  }
};

const loginValidate = async (req, res, next) => {
  try {
    await userLoginSchema.validate(req.body, { abortEarly: false });
    next();
  } catch (e) {
    return response(
      res,
      400,
      "validation failed:",
      Array.isArray(e.errors) ? e.errors.join(", ") : "invalid type format.."
    );
  }
};
module.exports = { registerValidate, loginValidate };
