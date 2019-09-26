const tokenService = require('../helpers/token');
const errors = require('../errors');
const userDB = require('../services/userDB');

exports.auth = (type = false) => (req, res, next) => {
  const token = req.headers['x-access-token'] || req.headers.authorization || req.body.token;
  if (!token) return next(errors.invalidToken('No token available'));
  try {
    if (!type) {
      tokenService.decodeToken(token);
      return next();
    }
    const admin = tokenService.decodeToken(token);
    const query = { where: { email: admin.sub.email } };
    return userDB.findUsersWhere(query).then(resp => {
      if (!resp.admin) return next(errors.notAuthError('Not authorized user'));
      return next();
    });
  } catch (ex) {
    return next(errors.invalidToken('Not a valid token'));
  }
};
