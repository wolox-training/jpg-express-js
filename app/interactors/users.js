const userDB = require('../services/userDB');
const crypt = require('../services/encrypt');
const errors = require('../errors');

exports.singIn = user => {
  const query = { where: { email: user.email } };
  return userDB
    .findUsersWhere(query)
    .then(respUser => crypt.decrypt(user.password, respUser.password))
    .catch(() => Promise.reject(errors.userExistsError('user does not exist')));
};
