const moment = require('moment');
const jwt = require('jwt-simple');
const { secret } = require('../../config').common.session;

exports.createToken = any => {
  const payload = {
    sub: any,
    iat: moment().unix(),
    exp: moment()
      .add(14, 'days')
      .unix()
  };
  return jwt.encode(payload, secret);
};
