const encrypt = require('../services/encrypt');

exports.registerBodyMapper = body => {
  const hash = encrypt.encrypt(body.password);
  return {
    ...body,
    lastName: body.last_name,
    password: hash
  };
};
