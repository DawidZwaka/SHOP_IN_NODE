const { validationResult } = require("express-validator");

module.exports = (req, res, next) => {
  const errors = validationResult(req);
  const errorsArr = errors.array();

  if (!errors.isEmpty()) {
    return res.status(403).json({ Errors: errorsArr });
  }
  next();
};
