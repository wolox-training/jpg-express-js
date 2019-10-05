const moment = require('moment');
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

exports.findUsersWhere = query =>
  User.findOne(query).catch(error => {
    logger.error(error);
    return Promise.reject(errors.databaseError('Not a success users query'));
  });

exports.getAllUsers = ({ query: { page = 0, limit = 10 } }) => {
  const fixLimit = limit > 1000 ? 100 : limit;
  const offset = page * limit;
  return User.findAndCountAll({
    limit: fixLimit,
    offset,
    raw: true
  }).catch(() => Promise.reject(errors.databaseError('cant get users')));
};

exports.invalidateAll = user =>
  User.update({ session: moment().unix() }, { where: { id: user.id }, raw: true }).catch(error => {
    logger.error(error);
    return Promise.reject(errors.databaseError(' error fatal'));
  });
