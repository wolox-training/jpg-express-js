const { check, validationResult } = require('express-validator');
const errors = require('../errors');
const logger = require('../logger');
const { User } = require('../models');

exports.registerUser = userA => {
  const user = userA;
  check(user.email)
    .isEmail()
    .custom(value =>
      User.findUserByEmail(value).then(usuario => {
        if (usuario) return Promise.reject(errors.emptyData('invalid email '));
        return Promise.resolve(value);
      })
    )
    .contains('@wolox.');
  check(user.password)
    .isLength({ min: 8 })
    .isAlphanumeric();
  check(user.name)
    .isAlpha()
    .exists({ checkNull: true });
  check(user.last_name)
    .isAlpha()
    .exists({ checkNull: true });
  const err = validationResult(user);
  if (!err.isEmpty()) return Promise.reject(errors.emptyData('user were not created'));
  return User.create(user)
    .then(res => {
      logger.info(res.User.name);
    })
    .catch(error => {
      logger.error(error);
      return Promise.reject(errors.requestError('database'));
    });
};
