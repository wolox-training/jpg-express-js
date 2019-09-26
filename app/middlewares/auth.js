const tokenService = require('../helpers/token');
const errors = require('../errors');

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
