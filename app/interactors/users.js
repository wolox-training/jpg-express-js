const userDB = require('../services/userDB');
const crypt = require('../services/encrypt');
const errors = require('../errors');
const token = require('../helpers/token');
const logger = require('../logger');
const serializer = require('../serializers/users');

exports.singIn = user => {
  const query = { where: { email: user.email } };
  return userDB
    .findUsersWhere(query)
    .then(resp => {
      if (!resp) return Promise.reject(errors.userExistsError('user does not exist'));
      return resp;
    })
    .then(respUser => crypt.decrypt(user.password, respUser.password))
    .then(userFound => {
      if (!userFound) return Promise.reject(errors.invalidData('password incorrect'));
      logger.info(`User with mail ${user.email} have singged in`);
      return Promise.resolve({ token: token.createToken(user) });
    });
};

exports.getAllUsers = req =>
  userDB.getAllUsers(req).then(users => {
    if (!users) return Promise.reject(errors.defaultError('There are not users availables'));
    logger.info('Succsessfull users consult');
    const response = serializer.serializeUsersResponse(users, req);
    return Promise.resolve(response);
  });
