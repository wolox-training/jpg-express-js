const request = require('supertest');
const nock = require('nock');
const moment = require('moment');
const { factory } = require('factory-girl');
const app = require('../../../../app');
const helper = require('../../testHelper');
const token = require('../../../../app/helpers/token');

const agent = request(app);
const mockResponse = {
  userId: 2,
  id: 2,
  title: 'quidem molestiae enim'
};

const user = {
  name: 'camilo',
  lastName: 'lopez',
  email: 'camilopez@wolox.co',
  password: '$2b$10$NJFKv8olocR3AdUvNO4If.ekoV2q/6qZDgSoCbsMQrcLcmdiis6ee',
  session: moment().unix()
};

describe('POST /albums/:id', () => {
  afterAll(() => nock.restore());
  beforeEach(() => {
    nock('https://jsonplaceholder.typicode.com')
      .get('/albums/2')
      .reply(200, mockResponse);
  });

  test('Should be a successfull album purchase', () =>
    factory
      .create('User', user)
      .then(() => agent.post('/albums/2').set('x-access-token', token.createToken(user)))
      .then(response => {
        expect(response.statusCode).toBe(200);
      }));

  test('Should fail because the album is already purchased', () =>
    helper
      .createUser(true)
      .then(logIn =>
        agent
          .post('/albums/2/')
          .set('x-access-token', logIn)
          .then(() => agent.post('/albums/2/').set('x-access-token', logIn))
      )
      .then(response => expect(response.body).toHaveProperty('message')));
});
