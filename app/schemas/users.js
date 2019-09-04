const { check } = require('express-validator');
const errors = require('../errors');
const { User } = require('../models');

exports.registerValidator = () => [
  check('email')
    .isEmail()
    .custom(value =>
      User.findUserByEmail(value).then(usuario => {
        if (usuario) return Promise.reject(errors.emptyData('invalid email '));
        return Promise.resolve(value);
      })
    )
    .contains('@wolox.'),
  check('password')
    .isLength({ min: 8 })
    .isAlphanumeric(),
  check('name')
    .isAlpha()
    .exists({ checkNull: true }),
  check('last_name')
    .isAlpha()
    .exists({ checkNull: true })
];
