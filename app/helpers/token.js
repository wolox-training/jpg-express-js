const moment = require('moment');
const jwt = require('jsonwebtoken');
const { secret } = require('../../config').common.session;

exports.createToken = any => {
  const payload = {
    sub: any,
    iat: moment().unix(),
    exp: moment()
      .add(14, 'days')
      .unix()
  };
  return jwt.sign(payload, secret);
};

exports.decodeToken = token => {
  const decoded = jwt.verify(token, secret);
  return decoded;
};
