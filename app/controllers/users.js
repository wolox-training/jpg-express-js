const logger = require('../logger');
const userDB = require('../services/userDB');
const { registerBodyMapper } = require('../mappers/users');
const errors = require('../errors');
const interactor = require('../interactors/users');

exports.registerUser = (req, res, next) => {
  logger.info('Starting the user creation');
  const user = registerBodyMapper(req.body);
  return userDB
    .validateUser(user)
    .then(responseUser => {
      if (responseUser) return Promise.reject(errors.userExistsError('user already exists'));
      return userDB.registerUser(user).then(response => {
        logger.info(`User with name ${response.name}, and email ${response.name}, was created`);
        return res.status(201).send(response);
      });
    })
    .catch(next);
};

exports.registerAdmin = (req, res, next) => {
  logger.info('Starting the admin register');
  const user = registerBodyMapper(req.body);
  return interactor
    .registerAdmin(user)
    .then(resp => {
      logger.info('Succsses admin register');
      res.status(201).send(resp);
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
  return interactor
    .getAllUsers(req)
    .then(response => res.status(200).send(response))
    .catch(next);
};
