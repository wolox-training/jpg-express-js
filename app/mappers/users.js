const crypt = require('../services/encrypt');

exports.registerBodyMapper = body => {
  const hash = crypt.encrypt(body.password);
  return {
    ...body,
    lastName: body.last_name,
    password: hash
  };
};
