const encrypt = require('../services/encrypt');

exports.registerBodyMapper = body => {
  const hash = encrypt(body.password);
  return {
    ...body,
    lastName: body.last_name,
    password: hash
  };
};
