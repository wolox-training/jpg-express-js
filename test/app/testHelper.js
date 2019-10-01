const request = require('supertest');
const app = require('../../app');
const { User } = require('../../app/models');

exports.createUserAndLogin = type => {
  const user = {
    name: 'juan',
    lastName: 'gomez',
    email: 'juan@wolox.co',
    password: '$2b$10$q0/nJGRvSyZz3i7fgvTY2OwMl4MPozMQI/62Bkz5F88tSl.3Y2W4u',
    admin: type
  };
  return User.create(user).then(() =>
    request(app)
      .post('/users/sessions')
      .send({
        email: 'juan@wolox.co',
        password: '12345678'
      })
  );
};
