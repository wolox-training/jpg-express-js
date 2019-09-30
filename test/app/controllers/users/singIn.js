const { factory } = require('factory-girl');
const request = require('supertest');
const app = require('../../../../app');
const { mockUser } = require('../../../mocks/users');
const { factoryByModel } = require('../../../factory/factory_by_models');

factoryByModel('User');

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
      .send(mockUser)
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
