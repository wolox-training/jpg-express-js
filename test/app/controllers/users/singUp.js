const request = require('supertest');
const app = require('../../../../app');

describe('POST /users', () => {
  const testUser = {
    name: 'andres',
    last_name: 'Gomez',
    email: 'andres@wolox.co',
    password: '12345678',
    admin: true
  };
  const agent = request(app);
  test('Should be a successful sign up', () =>
    agent
      .post('/users')
      .send(testUser)
      .then(response => {
        expect(response.statusCode).toBe(201);
      }));

  test('Should fail because the email already exists', () =>
    agent
      .post('/users')
      .send(testUser)
      .then(() =>
        agent
          .post('/users')
          .send(testUser)
          .then(response => {
            expect(response.statusCode).toBe(409);
          })
      ));

  test('Should because the password is incorrect', () =>
    request(app)
      .post('/users')
      .send({ ...testUser, password: '12345' })
      .then(response => {
        expect(response.statusCode).toBe(422);
      }));
});
