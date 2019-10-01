const request = require('supertest');
const app = require('../../../../app');
const { User } = require('../../../../app/models');

describe('POST /admin/users', () => {
  const agent = request(app);
  const testAdmin = {
    name: 'daniel',
    lastName: 'benavides',
    email: 'dani@wolox.co',
    password: '$2b$10$q0/nJGRvSyZz3i7fgvTY2OwMl4MPozMQI/62Bkz5F88tSl.3Y2W4u',
    admin: true
  };
  test('Should be a succesful admin creation', () =>
    User.create(testAdmin)
      .then(() =>
        agent.post('/users/sessions').send({
          email: 'dani@wolox.co',
          password: '12345678'
        })
      )
      .then(logIn =>
        agent
          .post('/admin/users')
          .set('x-access-token', logIn.body.token)
          .send({
            name: 'Marco',
            last_name: 'rivas',
            email: 'testadmin@wolox.co',
            password: '12345678'
          })
      )
      .then(response => expect(response.statusCode).toBe(201)));

  test('Should fail due to no admin user', () =>
    User.create({
      name: 'daniel',
      lastName: 'benavides',
      email: 'daniel@wolox.co',
      password: '$2b$10$q0/nJGRvSyZz3i7fgvTY2OwMl4MPozMQI/62Bkz5F88tSl.3Y2W4u',
      admin: false
    })
      .then(() =>
        agent.post('/users/sessions').send({
          email: 'daniel@wolox.co',
          password: '12345678'
        })
      )
      .then(logIn =>
        agent
          .post('/admin/users')
          .set('x-access-token', logIn.body.token)
          .send({
            name: 'Marco',
            lastName: 'Rivas',
            email: 'testadmin@wolox.co',
            password: '12345678'
          })
      )
      .then(response => expect(response.statusCode).toBe(401)));
});
