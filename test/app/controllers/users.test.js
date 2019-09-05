const request = require('supertest');
const app = require('../../../');
const { mookUser } = require('../../mooks/users');

const user = mookUser();

describe('POST /users', () => {
  it('shuld be a valid user', () =>
    request(app)
      .post('/users')
      .send(user)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(404));

  it('should fail if a email already exist', () =>
    request(app)
      .post('/users')
      .send(user)
      .then(
        request(app)
          .post('/users')
          .send(user)
          .expect(503)
      ));

  it('should fail if a user insert a bad password', () =>
    request(app)
      .post('/users')
      .send({ ...user, password: '123' })
      .expect(404));

  it('should fail due to null parameters', () =>
    request(app)
      .post('/users')
      .send({ ...user, name: '', password: '' })
      .expect(404));
});
