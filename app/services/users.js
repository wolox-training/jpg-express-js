const errors = require('../errors');
const logger = require('../logger');
const { User } = require('../models');

exports.registerUser = user =>
  User.create(user).catch(error => {
    logger.error(error);
    return Promise.reject(errors.databaseError(error.message));
  });

exports.validateUser = user => {
  const find = { where: { email: user.email, name: user.name } };
  return User.findOne(find).catch(error => {
    logger.error(error);
    return Promise.reject(errors.databaseError(error.message));
  });
};

exports.registerAdmin = user =>
  User.create({ ...user, admin: true }).catch(error => {
    logger.error(error);
    return Promise.reject(errors.databaseError(error.message));
  });

exports.becomeAdmin = user =>
  User.update({ admin: true }, { where: { email: user.email } }).catch(error => {
    logger.error(error);
    return Promise.reject(errors.databaseError(error.message));
  });
