const logger = require('../logger');
const userService = require('../services/users');
const { registerBodyMapper } = require('../mappers/users');
const errors = require('../errors');

exports.registerUser = (req, res, next) => {
  logger.info('Starting the user creation');
  const user = registerBodyMapper(req.body);
  return userService
    .validateUser(user)
    .then(responseUser => {
      if (responseUser !== null) return Promise.reject(errors.databaseError('user already exists'));
      return userService
        .registerUser(user, req)
        .then(response => {
          logger.info(response.name);
          logger.info('Success user creation');
          return res.send(response);
        })
        .catch(next);
    })
    .catch(next);
};
