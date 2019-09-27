// const { factory } = require('factory-girl');
const request = require('supertest');
const app = require('../../../app');
const { mockUser } = require('../../mocks/users');
const { factoryByModel } = require('../../factory/factory_by_models');

const user = mockUser();
// factoryByModel('User');
factoryByModel('Album');

describe('POST /users', () => {
  it('shuld be a successfull sing-in', () =>
    request(app)
      .post('/users')
      .send(user)
      .expect(201));
});
