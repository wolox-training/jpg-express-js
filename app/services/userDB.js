const errors = require('../errors');
const logger = require('../logger');
const { User } = require('../models');

exports.findUsersWhere = query =>
  User.findOne(query).catch(error => {
    logger.error(error);
    return Promise.reject(errors.databaseError('Not a success users query'));
  });

exports.getAllUsers = () =>
  User.findAll({
    limit: 5,
    offset: 0
  })
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
