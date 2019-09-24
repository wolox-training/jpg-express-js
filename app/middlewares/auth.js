const tokenService = require('../helpers/token');
const errors = require('../errors');
const userDB = require('../services/userDB');

exports.auth = (req, res, next) => {
  const token = req.headers['x-access-token'] || req.headers.authorization;
  if (!token) return next(errors.invalidToken('No token available'));
  try {
    tokenService.decodeToken(token);
    return next();
  } catch (ex) {
    return next(errors.invalidToken('Not a valid token'));
  }
};

exports.admin = (req, res, next) => {
  const token = req.headers['x-access-token'] || req.headers.authorization;
  if (!token) return next(errors.invalidToken('No token available'));
  try {
    const admin = tokenService.decodeToken(token);
    const query = { where: { email: admin.sub.email } };
    return userDB.findUsersWhere(query).then(resp => {
      if (!resp.admin || resp.admin === null) return next(errors.invalidData('Not authorized user'));
      return next();
    });
  } catch (ex) {
    return next(errors.invalidToken('Not a valid token'));
  }
};
