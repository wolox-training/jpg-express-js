const { factory } = require('factory-girl');
const request = require('supertest');
const app = require('../../../../app');
const { mockUser, mockUser2 } = require('../../../mocks/users');
const { factoryByModel } = require('../../../factory/factory_by_models');

factoryByModel('User');

describe('POST /users', () => {
  it('should be a successfull sing-up', () =>
    request(app)
      .post('/users')
      .send(mockUser2)
      .expect(201));

  it('should fail if a email already exist', () =>
    factory
      .create('User', mockUser)
      .then(() =>
        request(app)
          .post('/users')
          .send(mockUser)
      )
      .then(res => {
        expect(res.statusCode).toBe(409);
      }));

  it('should fail if a user insert a bad password', () =>
    request(app)
      .post('/users')
      .send({ ...mockUser, password: '123' })
      .expect(422));

  it('should fail due to null parameters', () => {
    const userIn = { email: mockUser.email, password: mockUser.password };
    return request(app)
      .post('/users')
      .send(userIn)
      .expect(422);
  });
});

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
