const request = require('supertest');
const moment = require('moment');
const { factory } = require('factory-girl');
const jwt = require('jsonwebtoken');
const app = require('../../../../app');
const token = require('../../../../app/helpers/token');
const { secret } = require('../../../../config').common.session;
const { expiration } = require('../../../../config').common.session;

const agent = request(app);
const user = {
  name: 'camilo',
  lastName: 'lopez',
  email: 'camilopez@wolox.co',
  password: '$2b$10$NJFKv8olocR3AdUvNO4If.ekoV2q/6qZDgSoCbsMQrcLcmdiis6ee',
  admin: true
};

describe('POST /users/sessions/invalidate_all', () => {
  test('Should be a successfull Log out', () =>
    factory.create('User', { ...user, session: moment().unix() }).then(() =>
      agent
        .post('/users/sessions/invalidate_all')
        .set('x-access-token', token.createToken(user).token)
        .then(response => {
          expect(response.body).toHaveProperty('log_out');
          return expect(response.statusCode).toBe(200);
        })
    ));

  test('Should be fail users query due to a expired token', () => {
    const payload = {
      sub: user,
      iat: 11111111,
      exp: moment()
        .add(expiration, 'days')
        .unix()
    };
    const tokenOut = jwt.sign(payload, secret);
    return factory.create('User', { ...user, session: moment().unix() }).then(() =>
      agent
        .post('/users/sessions/invalidate_all')
        .set('x-access-token', tokenOut)
        .then(() => agent.get('/users').set('x-access-token', tokenOut))
        .then(response => {
          expect(response.body).toHaveProperty('internal_code');
          return expect(response.statusCode).toBe(401);
        })
    );
  });
});
