const { factory } = require('factory-girl');
const request = require('supertest');
const app = require('../../../../app');
const { mockUser } = require('../../../mocks/users');
const { factoryByModel } = require('../../../factory/factory_by_models');

factoryByModel('User');

describe('POST /admin/users', () => {
  const password = '$2b$10$q0/nJGRvSyZz3i7fgvTY2OwMl4MPozMQI/62Bkz5F88tSl.3Y2W4u';
  const mockEmail = 'juan@wolox.co';
  const mockPass = '12345678';
  beforeEach(() => {
    factory.create('User', {
      email: mockEmail,
      password,
      admin: true
    });
  });

  it('should be a successfull new admin register', () =>
    request(app)
      .post('/users/sessions')
      .send({ email: mockEmail, password: mockPass })
      .then(response =>
        request(app)
          .post('/admin/users')
          .set({ 'x-access-token': response.body.token })
          .send(mockUser)
      )
      .then(response => {
        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty('admin');
      }));

  it('should be a successfull register of an existent user', () =>
    factory.create('User', mockUser).then(() =>
      request(app)
        .post('/users/sessions')
        .send({ email: mockEmail, password: mockPass })
        .then(response =>
          request(app)
            .post('/admin/users')
            .set('x-access-token', response.body.token)
            .send(mockUser)
        )
        .then(response => {
          expect(response.statusCode).toBe(201);
          expect(response.body).toHaveProperty('admin');
        })
    ));

  it('should fail for a bad token', () =>
    request(app)
      .post('/admin/users')
      .set({ 'x-access-token': 'bad-token' })
      .send(mockUser)
      .then(response => {
        expect(response.statusCode).toBe(401);
      }));

  it('should fail for user permissons', () =>
    factory.create('User', { ...mockUser, email: 'test@wolox.co', password }).then(() =>
      request(app)
        .post('/users/sessions')
        .send({ email: 'test@wolox.co', password: mockPass })
        .then(response =>
          request(app)
            .post('/admin/users')
            .set({ 'x-access-token': response.body.token })
            .send({ ...mockUser, email: 'test2@wolox.co' })
        )
        .then(response => {
          expect(response.statusCode).toBe(401);
        })
    ));
});
