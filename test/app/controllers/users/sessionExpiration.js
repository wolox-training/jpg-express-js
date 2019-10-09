const request = require('supertest');
const moment = require('moment');
const { factory } = require('factory-girl');
const jwt = require('jsonwebtoken');
const app = require('../../../../app');
const token = require('../../../../app/helpers/token');
const { secret } = require('../../../../config').common.session;

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

const agent = request(app);
const user = {
  name: 'camilo',
  lastName: 'lopez',
  email: 'camilopez@wolox.co',
  password: '$2b$10$NJFKv8olocR3AdUvNO4If.ekoV2q/6qZDgSoCbsMQrcLcmdiis6ee',
  admin: true
};

describe('AUTH token expiration', () => {
  test('Should be a successfull users query with a non expired token', () =>
    factory.create('User', { ...user, admin: true, session: moment().unix() }).then(() =>
      agent
        .get('/users')
        .set('x-access-token', token.createToken(user).token)
        .then(response => {
          expect(response.body).toHaveProperty('users');
          return expect(response.statusCode).toBe(200);
        })
    ));

  test('Should be a fail users query due to an expired token', () => {
    const payload = {
      sub: user,
      iat: moment().unix(),
      exp: moment()
        .add(1, 'seconds')
        .unix()
    };
    const tokenOut = jwt.sign(payload, secret);
    return factory.create('User', { ...user, session: moment().unix() }).then(() =>
      delay(4000).then(() =>
        agent
          .get('/users')
          .set('x-access-token', tokenOut)
          .then(response => {
            expect(response.body).toHaveProperty('internal_code');
            return expect(response.statusCode).toBe(401);
          })
      )
    );
  });
});
