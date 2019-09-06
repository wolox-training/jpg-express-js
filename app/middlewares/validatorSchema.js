const { validationResult } = require('express-validator');
const errors = require('../errors');

exports.checkError = (req, res, next) => {
  const err = validationResult(req);
  if (!err.isEmpty()) return next(errors.invalidData(err.array({ onlyFirstError: true }).map(e => e.msg)));
  return next();
};
