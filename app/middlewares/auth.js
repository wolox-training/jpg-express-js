const tokenService = require('../helpers/token');
const errors = require('../errors');
const userDB = require('../services/userDB');

exports.auth = (type = false) => (req, res, next) => {
  const token = req.headers['x-access-token'] || req.headers.authorization || req.body.token;
  if (!token) return next(errors.invalidToken('No token available'));
  try {
    //  console.log(token, '**************** token');
    const user = tokenService.decodeToken(token);
    const query = { where: { email: user.sub.email } };
    return userDB
      .findUsersWhere(query)
      .then(resp => {
        // console.log(resp, 'resp*******');
        if (type && !resp.admin) return next(errors.notAuthError('Not authorized user'));
        if (resp.dataValues.session && user.iat < resp.dataValues.session)
          return next(errors.invalidToken('session expired'));
        req.user = resp.dataValues;
        return next();
      })
      .catch(next);
  } catch (ex) {
    console.log(ex);
    return next(errors.invalidToken('Not a valid token'));
  }
};
