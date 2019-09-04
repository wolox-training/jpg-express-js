const logger = require('../logger');
const errors = require('../errors');
const userService = require('../services/users');

exports.registerUser = (req, res, next) => {
  logger.info('Iniciando la creacion de usuario');
  // encriptar contraseña
  userService
    .registerUser(req)
    .then(response => {
      if (!response.length) return Promise.reject(errors.emptyData('user not created'));
      logger.info('Succes user creation');
      return res.send(response);
    })
    .catch(next);
};
