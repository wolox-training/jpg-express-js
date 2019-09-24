const userDB = require('../services/userDB');
const crypt = require('../services/encrypt');
const errors = require('../errors');
const token = require('../helpers/token');
const logger = require('../logger');

exports.singIn = user => {
  const query = { where: { email: user.email } };
  return userDB
    .findUsersWhere(query)
    .then(resp => {
      if (!resp) return Promise.reject(errors.userExistsError('user does not exist'));
      return crypt.decrypt(user.password, resp.password);
    })
    .then(userFound => {
      if (!userFound) return Promise.reject(errors.invalidData('password incorrect'));
      logger.info(`User with mail ${user.email} have singged in`);
      return Promise.resolve({ token: token.createToken(user) });
    });
};
