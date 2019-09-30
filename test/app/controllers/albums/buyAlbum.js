const request = require('supertest');
const nock = require('nock');
const dictum = require('dictum.js');
const app = require('../../../../app');
const { User } = require('../../../../app/models');

const createUserAndLogin = () => {
  const user = {
    name: 'Raul',
    lastName: 'gonzalez',
    email: 'raul@wolox.co',
    password: '$2b$10$q0/nJGRvSyZz3i7fgvTY2OwMl4MPozMQI/62Bkz5F88tSl.3Y2W4u',
    admin: true
  };
  return User.create(user).then(() =>
    request(app)
      .post('/users/sessions')
      .send({
        email: 'raul@wolox.co',
        password: '12345678'
      })
  );
};

const mockResponse = {
  userId: 2,
  id: 2,
  title: 'quidem molestiae enim'
};

describe('POST /albums/:id', () => {
  beforeEach(() => {
    nock('https://jsonplaceholder.typicode.com')
      .get('/albums/2')
      .reply(200, mockResponse);
  });
  const agent = request(app);

  test('Should be a successfull album purchase', () =>
    createUserAndLogin()
      .then(logIn => agent.post('/albums/2/').set('x-access-token', logIn.body.token))
      .then(response => {
        dictum.chai(response, 'Test buying album');
        return expect(response.statusCode).toBe(200);
      }));

  test('Should fail because the album is already purchased', () =>
    createUserAndLogin()
      .then(logIn =>
        agent
          .post('/albums/2/')
          .set('x-access-token', logIn.body.token)
          .then(() => agent.post('/albums/2/').set('x-access-token', logIn.body.token))
      )
      .then(response => {
        dictum.chai(response, 'Test buying the same album two times');
        return expect(response.body).toHaveProperty('message');
      }));
});
