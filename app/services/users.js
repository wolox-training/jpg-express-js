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

exports.getUsers = () =>
  User.findAll({ raw: true })
    .then(users =>
      users.map(user => {
        const us = {
          name: user.name,
          last_name: user.last_name,
          email: user.email
        };
        return us;
      })
    )
    .catch(() => Promise.reject(errors.databaseError('cant get users')));
