const request = require('supertest');
const nock = require('nock');
const moment = require('moment');
const { factory } = require('factory-girl');
const app = require('../../../../app');
const helper = require('../../testHelper');
const token = require('../../../../app/helpers/token');

const agent = request(app);
const admin = true;
const mockResponse = {
  userId: 2,
  id: 2,
  title: 'quidem molestiae enim'
};
const user = {
  name: 'alan',
  lastName: 'correa',
  email: 'alan@wolox.co',
  password: '$2b$10$Rz9Vh4/bNhclktWDcQ1zC.PF/Nlhx5YAQaQyeUMMyq5BDtb9fEGx6',
  session: moment().unix()
};
describe('GET /users/:id/albums', () => {
  afterAll(() => nock.restore());
  beforeEach(() => {
    nock.cleanAll();
    nock('https://jsonplaceholder.typicode.com')
      .get('/albums/2')
      .reply(200, mockResponse);
  });

  test('Should be a succesfull album query of a default user', () =>
    factory
      .create('User', { ...user, admin: true })
      .then(() => token.createToken(user))
      .then(tok =>
        agent
          .post('/albums/2')
          .set('x-access-token', tok)
          .then(() =>
            agent
              .get('/users/1/albums')
              .set('x-access-token', tok)
              .then(response => {
                expect(response.body).toHaveProperty('purchased_albums');
                return expect(response.statusCode).toBe(200);
              })
          )
      ));

  test('Should be a succesfull album query of an admin user', () =>
    factory
      .create('User', { ...user, admin: true })
      .then(() => token.createToken(user))
      .then(tok =>
        agent
          .post('/albums/2')
          .set('x-access-token', tok)
          .then(() =>
            agent
              .get('/users/1/albums')
              .set('x-access-token', tok)
              .then(response => {
                expect(response.body).toHaveProperty('purchased_albums');
                return expect(response.statusCode).toBe(200);
              })
          )
      ));

  test('Sould fail due to authorization', () =>
    helper.createUser(!admin).then(tok =>
      agent
        .get('/users/10/albums')
        .set('x-access-token', tok)
        .then(response => expect(response.statusCode).toBe(401))
    ));
});
