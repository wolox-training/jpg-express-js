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
      return userService.registerUser(user).then(response => {
        logger.info(`User with name ${response.name}, and email ${response.name}, was created`);
        return res.send(response);
      });
    })
    .catch(next);
};

exports.validateUser = (req, res, next) => {
  logger.info('Starting the user validation');
  const user = registerBodyMapper(req.body);
  return userService
    .singIn(user)
    .then(responseUser => {
      if (responseUser !== null) return Promise.reject(errors.databaseError('user already exists'));
      logger.info(`User with name ${responseUser.name} have singged in`);
      return res.send({ token: userService.createToken(user) });
    })
    .catch(next);
};
