// const session = require('express-session');
const tokenService = require('../helpers/token');

exports.auth = (req, res, next) => {
  const token = req.headers['x-access-token'] || req.headers.authorization || req.body.token;
  if (!token) return res.status(401).send({ token: 'Access denied. No token provided.' });
  try {
    tokenService.decodeToken(token);
    return next();
  } catch (ex) {
    return res.status(400).send({ token: 'Invalid token.' });
  }
};
