const moment = require('moment');
const jwt = require('jsonwebtoken');
const { secret, expiration } = require('../../config').common.session;

exports.createToken = any => {
  const exp = moment().add(expiration, 'seconds');
  const payload = {
    sub: any,
    iat: moment().unix(),
    exp: exp.unix()
  };
  return {
    token: jwt.sign(payload, secret),
    expiration: exp.toDate()
  };
};

exports.decodeToken = token => {
  const decoded = jwt.verify(token, secret);
  return decoded;
};
