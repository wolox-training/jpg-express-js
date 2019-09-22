const { factory } = require('factory-girl');
const request = require('supertest');
const app = require('../../../app');
const { mockUser } = require('../../mocks/users');
const { factoryByModel } = require('../../factory/factory_by_models');

const user = mockUser();
factoryByModel('User');

describe('POST /users', () => {
  it('shuld be a successfull sing-in', () =>
    request(app)
      .post('/users')
      .send(user)
      .expect(201));

  it('should fail if a email already exist', () =>
    factory
      .create('User', user)
      .then(() =>
        request(app)
          .post('/users')
          .send(user)
      )
      .then(res => {
        expect(res.statusCode).toBe(409);
      }));

  it('should fail if a user insert a bad password', () =>
    request(app)
      .post('/users')
      .send({ ...user, password: '123' })
      .expect(422));

  it('should fail due to null parameters', () => {
    const userIn = { email: user.email, password: user.password };
    return request(app)
      .post('/users')
      .send(userIn)
      .expect(422);
  });
});

describe('POST /users/sessions', () => {
  const password = '$2b$10$q0/nJGRvSyZz3i7fgvTY2OwMl4MPozMQI/62Bkz5F88tSl.3Y2W4u';
  it('should return a token for a valid user', () =>
    factory.create('User', { password }).then(userIn => {
      const us = userIn.dataValues;
      const mockReq = {
        password: '12345678',
        email: us.email
      };
      return request(app)
        .post('/users/sessions')
        .send(mockReq)
        .expect(200);
    }));

  it('should fail if a user does not exist', () =>
    request(app)
      .post('/users/sessions')
      .send(user)
      .expect(409));

  it('should fail if password is incorrect', () =>
    factory.create('User', { password }).then(userIn => {
      const us = userIn.dataValues;
      const mockReq = {
        password: '12345679',
        email: us.email
      };
      return request(app)
        .post('/users/sessions')
        .send(mockReq)
        .expect(422);
    }));
});

describe('GET /users', () => {
  it.only('should return a list of 5 users', () => {
    factory.create('User').then(us => {
      const mokReq = {
        email: us.email,
        password: us.password
      };
      return request(app)
        .post('/users/sessions')
        .send(mokReq)
        .then(res =>
          request(app)
            .get('/users')
            .send({ 'x-access-token': res })
            .expect(200)
        );
    });
  });
});
