const logger = require('../logger');
const userService = require('../services/users');
const { registerBodyMapper } = require('../mappers/users');
const errors = require('../errors');
const interactor = require('../interactors/users');
const userDB = require('../services/userDB');
const serializer = require('../serializers/users');

exports.registerUser = (req, res, next) => {
  logger.info('Starting the user creation');
  const user = registerBodyMapper(req.body);
  return userService
    .validateUser(user)
    .then(responseUser => {
      if (responseUser) return Promise.reject(errors.userExistsError('user already exists'));
      return userService.registerUser(user).then(response => {
        logger.info(`User with name ${response.name}, and email ${response.name}, was created`);
        return res.status(201).send(response);
      });
    })
    .catch(next);
};

exports.singIn = (req, res, next) =>
  interactor
    .singIn(req.body)
    .then(response => {
      logger.info('Starting the user validation');
      return res.status(200).send(response);
    })
    .catch(next);

exports.getUsers = (req, res, next) => {
  logger.info('Starting the user consult');
  return userDB
    .getAllUsers(req)
    .then(users => {
      if (!users) return Promise.reject(errors.defaultError('There are not users availables'));
      logger.info('Succsessfull users consult');
      const response = serializer.serializeUsersResponse(users, req);
      return res.status(200).send(response);
    })
    .catch(next);
};
