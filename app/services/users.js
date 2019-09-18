const jwt = require('jwt-simple');
const moment = require('moment');
const bcrypt = require('bcrypt');
const errors = require('../errors');
const logger = require('../logger');
const { User } = require('../models');
const config = require('../../config/config');

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

exports.singIn = user => {
  try {
    const find = { where: { email: user.email } };
    return User.findOne(find)
      .then(respUser => bcrypt.compare(user.password, respUser.password))
      .catch(() => Promise.reject(errors.userExistsError('user does not exist')));
  } catch (error) {
    logger.error(error);
    return Promise.reject(errors.databaseError(error.message));
  }
};

exports.createToken = user => {
  const payload = {
    sub: user.name,
    iat: moment().unix(),
    exp: moment()
      .add(14, 'days')
      .unix()
  };
  return jwt.encode(payload, config.TOKEN_SECRET);
};
