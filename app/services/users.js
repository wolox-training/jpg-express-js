const { validationResult } = require('express-validator');
const errors = require('../errors');
const logger = require('../logger');
const { User } = require('../models');

exports.registerUser = (user, req) => {
  const err = validationResult(req);
  if (!err.isEmpty()) return Promise.reject(errors.invalidData('user were not created'));
  return User.create(user).catch(error => {
    logger.error(error);
    return Promise.reject(errors.databaseError('database error'));
  });
};
