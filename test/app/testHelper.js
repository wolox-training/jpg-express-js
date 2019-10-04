const { User } = require('../../app/models');
const token = require('../../app/helpers/token');

exports.createUser = type => {
  const user = {
    name: 'juan',
    lastName: 'gomez',
    email: 'juan@wolox.co',
    password: '$2b$10$q0/nJGRvSyZz3i7fgvTY2OwMl4MPozMQI/62Bkz5F88tSl.3Y2W4u'
  };
  return User.create({ ...user, admin: type }).then(() => token.createToken(user));
};
