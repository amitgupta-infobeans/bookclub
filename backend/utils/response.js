const response = (res, status = 200, message = "", error = "", data = {}) => {
  res.status(status).json({ message, data, error });
};

module.exports = { response };
