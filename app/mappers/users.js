const bcrypt = require('bcrypt');

exports.registerBodyMapper = body => {
  const hash = bcrypt.hashSync(body.password, 10);
  return {
    ...body,
    lastName: body.last_name,
    password: hash
  };
};
