const request = require('supertest');
const app = require('../../../../app');

describe('POST /users/sessions', () => {
  const userTest = {
    name: 'David',
    last_name: 'Montoya',
    email: 'david@wolox.ar',
    password: '12345678'
  };

  test('Should be a successfull Log in', () => {
    const agent = request(app);
    return agent
      .post('/users')
      .send(userTest)
      .then(() =>
        agent
          .post('/users/sessions')
          .send({
            email: userTest.email,
            password: userTest.password
          })
          .then(response => {
            expect(response.statusCode).toBe(200);
          })
      );
  });

  test('Should fail due to wrong email', () => {
    const agent = request(app);
    return agent
      .post('/users')
      .send(userTest)
      .then(() =>
        agent
          .post('/users/sessions')
          .send({
            email: 'fail@wolox.co',
            password: userTest.password
          })
          .then(response => {
            expect(response.statusCode).toBe(409);
          })
      );
  });

  test('Should fail due to wrong password', () => {
    const agent = request(app);
    return agent
      .post('/users')
      .send(userTest)
      .then(() =>
        agent
          .post('/users/sessions')
          .send({
            email: userTest.email,
            password: '12345'
          })
          .then(response => {
            expect(response.statusCode).toBe(422);
          })
      );
  });
});
