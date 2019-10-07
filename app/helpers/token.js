const moment = require('moment');
const jwt = require('jsonwebtoken');
const { secret, expiration } = require('../../config').common.session;

exports.createToken = any => {
  const payload = {
    sub: any,
    iat: moment().unix(),
    exp: moment()
      .add(expiration, 'days')
      .unix()
  };
  return jwt.sign(payload, secret);
};

exports.decodeToken = token => {
  const decoded = jwt.verify(token, secret);
  return decoded;
};
