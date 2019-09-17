const { factory } = require('factory-girl');
const request = require('supertest');
const app = require('../../../');
const { mockUser } = require('../../mocks/users');
const { factoryByModel } = require('../../factory/factory_by_models');

const user = mockUser();
factoryByModel('User');

describe('POST /users', () => {
  it('shuld be a valid user', () =>
    request(app)
      .post('/users')
      .send(user)
      .expect(201));

  it('should fail if a email already exist', () =>
    factory.create('User').then(userIn => {
      const us = userIn.dataValues;
      const mockUs = {
        name: us.name,
        last_name: us.last_name,
        password: us.password,
        email: us.email
      };
      return request(app)
        .post('/users')
        .send(mockUs)
        .expect(422);
    }));

  it('should fail if a user insert a bad password', () =>
    request(app)
      .post('/users')
      .send({ ...user, password: '123' })
      .expect(404));

  it('should fail due to null parameters', () => {
    delete user.name;
    delete user.password;
    return request(app)
      .post('/users')
      .send(user)
      .expect(404);
  });
});
