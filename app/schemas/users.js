/* eslint-disable no-useless-escape */
const { check } = require('express-validator');
const errors = require('../errors');
// const { User } = require('../models');

exports.registerValidator = () => [
  check('email')
    .isEmail()
    .exists()
    .custom(value => {
      if (!/^[a-zA-Z0-9._-]+@wolox.(co|com.ar|cl|ar|mx)$/.test(value))
        return Promise.reject(errors.invalidData('invalid email'));
      return true;
    }),
  check('password')
    .isLength({ min: 8 })
    .isAlphanumeric()
    .exists(),
  check('name')
    .isAlpha()
    .exists({ checkNull: true }),
  check('last_name')
    .isAlpha()
    .exists({ checkNull: true })
];
