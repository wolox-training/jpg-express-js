const request = require('supertest');
const app = require('../../../../app');
const helper = require('../../testHelper');

describe('GET /users/:id/albums', () => {
  const agent = request(app);
  const admin = true;
  test('Should be a succesfull album query of a default user', () =>
    helper.createUserAndLogin(!admin).then(logIn => {
      agent
        .post('/albums/2/')
        .set('x-access-token', logIn.body.token)
        .then(() => {
          agent
            .get('/users/1/albums')
            .set('x-access-token', logIn.body.token)
            .then(response => expect(response.statusCode).toBe(200));
        });
    }));

  test('Should be a succesfull album query of an admin user', () =>
    helper.createUserAndLogin(admin).then(logIn => {
      agent
        .post('/albums/2/')
        .set('x-access-token', logIn.body.token)
        .then(() => {
          agent
            .get('/users/1/albums')
            .set('x-access-token', logIn.body.token)
            .then(response => expect(response.statusCode).toBe(200));
        });
    }));

  test('Sould fail due to authorization', () =>
    helper.createUserAndLogin(!admin).then(logIn =>
      agent
        .get('/users/10/albums')
        .set('x-access-token', logIn.body.token)
        .then(response => expect(response.statusCode).toBe(401))
    ));
});
