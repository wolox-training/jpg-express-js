const request = require('supertest');
const app = require('../../../app');
const { mockUser } = require('../../mocks/users');

const user = mockUser();

describe('POST /users', () => {
  it('shuld be a valid user', () =>
    request(app)
      .post('/users')
      .send(user)
      .expect(201));

  it('should fail if a email already exist', () =>
    request(app)
      .post('/users')
      .send(user)
      .then(
        request(app)
          .post('/users')
          .send(user)
          .expect(409)
      ));

  it('should fail if a user insert a bad password', () =>
    request(app)
      .post('/users')
      .send({ ...user, password: '123' })
      .expect(422));

  it('should fail due to null parameters', () => {
    delete user.name;
    delete user.password;
    return request(app)
      .post('/users')
      .send(user)
      .expect(422);
  });
});
