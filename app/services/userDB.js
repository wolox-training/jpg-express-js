const errors = require('../errors');
const logger = require('../logger');
const { User } = require('../models');

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
