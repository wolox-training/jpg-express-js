const logger = require('../logger');
const errors = require('../errors');
const userService = require('../services/users');

exports.registerUser = (req, res, next) => {
  logger.info('Iniciando la creacion de usuario');
  const { body } = req;
  // encriptar contraseña
  userService
    .registerUser(body)
    .then(response => {
      if (!response.length) return Promise.reject(errors.emptyData('user not created'));
      logger.info('Succes user creation');
      return res.send(response);
    })
    .catch(next);
};
