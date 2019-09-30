const request = require('supertest');
const dictum = require('dictum.js');
const app = require('../../../../app');

describe('GET /users', () => {
  const agent = request(app);
  const testUser = {
    name: 'camilo',
    last_name: 'perez',
    email: 'camilo@wolox.co',
    password: '12345678',
    admin: true
  };
  test('Test get users list. It should respond with code 200', () =>
    agent
      .post('/users')
      .send(testUser)
      .then(created => {
        expect(created.statusCode).toBe(201);
        return agent
          .post('/users/sessions')
          .send({
            email: testUser.email,
            password: testUser.password
          })
          .then(response => {
            expect(response.statusCode).toBe(200);
            return agent
              .get('/users')
              .set('x-access-token', response.body.token)
              .then(res => {
                dictum.chai(res, 'Test get users list. It should respond with code 200');
                return expect(res.statusCode).toBe(200);
              });
          });
      }));
});
