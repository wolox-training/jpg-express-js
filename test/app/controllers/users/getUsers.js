const { factory } = require('factory-girl');
const request = require('supertest');
const app = require('../../../../app');
const { factoryByModel } = require('../../../factory/factory_by_models');

factoryByModel('User');

describe('GET /users', () => {
  const password = '$2b$10$q0/nJGRvSyZz3i7fgvTY2OwMl4MPozMQI/62Bkz5F88tSl.3Y2W4u';
  const mockEmail = 'juan@wolox.co';
  const mockPass = '12345678';
  beforeEach(() => {
    factory.create('User', {
      email: mockEmail,
      password
    });
  });

  it('should return a single user query successfully', () =>
    request(app)
      .post('/users/sessions')
      .send({ email: mockEmail, password: mockPass })
      .then(response =>
        request(app)
          .get('/users')
          .set({ 'x-access-token': response.body.token })
      )
      .then(response => {
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('users');
      }));

  it('should return a 10 user query successfully', () =>
    factory.createMany('User', 10).then(() =>
      request(app)
        .post('/users/sessions')
        .send({ email: mockEmail, password: mockPass })
        .then(response =>
          request(app)
            .get('/users')
            .set({ 'x-access-token': response.body.token })
        )
        .then(response => {
          expect(200);
          expect(response.body).toHaveProperty('users');
          expect(response.body.users.length).toBe(10);
        })
    ));

  it('should fail for a no authorizated user', () =>
    request(app)
      .post('/users/sessions')
      .send({ email: mockEmail, password: mockPass })
      .then(() =>
        request(app)
          .get('/users')
          .set({ 'x-access-token': 'bad-token' })
      )
      .then(response => {
        expect(response.statusCode).toBe(401);
      }));
});
