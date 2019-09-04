const { validationResult } = require('express-validator');
const errors = require('../errors');
const logger = require('../logger');
const { User } = require('../models');

exports.registerUser = req => {
  const err = validationResult(req);
  if (!err.isEmpty()) return Promise.reject(errors.emptyData('user were not created'));
  return User.create(req.body)
    .then(res => {
      logger.info(res.User.name);
    })
    .catch(error => {
      logger.error(error);
      return Promise.reject(errors.requestError('database'));
    });
};
