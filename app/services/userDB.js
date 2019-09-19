const errors = require('../errors');
const logger = require('../logger');
const { User } = require('../models');

exports.findUsersWhere = query =>
  User.findOne(query).catch(error => {
    logger.error(error);
    return Promise.reject(errors.databaseError('Not a success users query'));
  });
