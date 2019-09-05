const request = require('supertest');
const { factory } = require('factory-girl');
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
    factory.create('users').then(response =>
      request(app)
        .post('/users')
        .send({ ...user, email: response.email })
        .then(() => expect.rejects.toThrow('database_error'))
    ));

  it('should fail if a user insert a bad password', () =>
    request(app)
      .post('/users')
      .send({ ...user, password: '123' })
      .then(() => expect.rejects.toThrow('database_error')));

  it('should fail due to null parameters', () =>
    request(app)
      .post('/users')
      .send({ ...user, name: '', password: '' })
      .then(() => expect.rejects.toThrow('database_error')));
});
