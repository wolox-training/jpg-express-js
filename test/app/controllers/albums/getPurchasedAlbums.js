const request = require('supertest');
const nock = require('nock');
const app = require('../../../../app');
const helper = require('../../testHelper');
const { User } = require('../../../../app/models');
const token = require('../../../../app/helpers/token');

const agent = request(app);
const admin = true;
const mockResponse = {
  userId: 2,
  id: 2,
  title: 'quidem molestiae enim'
};

describe('GET /users/:id/albums', () => {
  afterAll(() => nock.restore());
  beforeEach(() => {
    nock.cleanAll();
    nock('https://jsonplaceholder.typicode.com')
      .get('/albums/2')
      .reply(200, mockResponse);
  });

  test('Should be a succesfull album query of a default user', () => {
    const user = {
      name: 'alan',
      lastName: 'correa',
      email: 'alan@wolox.co',
      password: '$2b$10$Rz9Vh4/bNhclktWDcQ1zC.PF/Nlhx5YAQaQyeUMMyq5BDtb9fEGx6'
    };
    return User.create({ ...user, admin: true })
      .then(() => token.createToken(user))
      .then(tok =>
        agent
          .post('/albums/2')
          .set('x-access-token', tok)
          .then(() =>
            agent
              .get('/users/1/albums')
              .set('x-access-token', tok)
              .then(response => expect(response.statusCode).toBe(200))
          )
      );
  });

  test('Should be a succesfull album query of an admin user', () => {
    const user = {
      name: 'david',
      lastName: 'montoya',
      email: 'david@wolox.co',
      password: '$2b$10$vn416Q0LFZ1uxwDnEYvnK.akT58G092KrFi5c2aaew6hFIZcgF4NO'
    };
    return User.create({ ...user, admin: true })
      .then(() => token.createToken(user))
      .then(tok =>
        agent
          .post('/albums/2')
          .set('x-access-token', tok)
          .then(() =>
            agent
              .get('/users/1/albums')
              .set('x-access-token', tok)
              .then(response => expect(response.statusCode).toBe(200))
          )
      );
  });

  test('Sould fail due to authorization', () =>
    helper.createUser(!admin).then(tok =>
      agent
        .get('/users/10/albums')
        .set('x-access-token', tok)
        .then(response => expect(response.statusCode).toBe(401))
    ));
});
