const errors = require('../errors');
const logger = require('../logger');
const { User } = require('../models');

exports.registerUser = user =>
  User.create(user).catch(error => {
    logger.error(error);
    return Promise.reject(errors.databaseError('database error'));
  });
