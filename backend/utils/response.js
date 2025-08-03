const response = (
  res,
  status = 200,
  message = "",
  error = "",
  data = {},
  total = 0
) => {
  if (total) {
    return res.status(status).json({ message, data, error, total });
  }
  return res.status(status).json({ message, data, error });
};

module.exports = { response };
