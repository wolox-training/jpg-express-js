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
      return crypt.decrypt(user.password, resp.password);
    })
    .then(userFound => {
      if (!userFound) return Promise.reject(errors.invalidData('password incorrect'));
      logger.info(`User with mail ${user.email} have singged in`);
      return Promise.resolve(token.createToken(user));
    });
};

exports.registerAdmin = user =>
  userDB
    .validateUser(user)
    .then(response => {
      if (!response) return userDB.registerAdmin(user);
      return userDB.becomeAdmin(user);
    })
    .then(() => {
      logger.info('Succssesfull admin register');
      return Promise.resolve(serializer.serializeRegisterAdminResponse(user));
    });

exports.getAllUsers = req =>
  userDB.getAllUsers(req).then(users => {
    if (!users) return Promise.reject(errors.notFoundError('There are not users availables'));
    logger.info('Succsessfull users consult');
    return Promise.resolve(serializer.serializeUsersResponse(users, req));
  });
