const request = require('supertest');
const nock = require('nock');
const { factory } = require('factory-girl');
const moment = require('moment');
const app = require('../../../../app');
const token = require('../../../../app/helpers/token');
const { factoryByModel } = require('../../../factory/factory_by_models');

factoryByModel('Album');
factoryByModel('User');

const agent = request(app);

const albumResponse = {
  userId: 1,
  id: 3,
  title: 'quidem molestiae enim'
};

const photosResponse = [
  {
    albumId: 3,
    id: 1,
    title: 'accusamus beatae ad facilis cum similique qui sunt',
    url: 'https://via.placeholder.com/600/92c952',
    thumbnailUrl: 'https://via.placeholder.com/150/92c952'
  },
  {
    albumId: 3,
    id: 2,
    title: 'reprehenderit est deserunt velit ipsam',
    url: 'https://via.placeholder.com/600/771796',
    thumbnailUrl: 'https://via.placeholder.com/150/771796'
  }
];

const user = {
  name: 'camilo',
  lastName: 'lopez',
  email: 'camilopez@wolox.co',
  password: '$2b$10$NJFKv8olocR3AdUvNO4If.ekoV2q/6qZDgSoCbsMQrcLcmdiis6ee',
  session: moment().unix()
};

describe('GET /users/albums/:id/photos', () => {
  afterEach(() => nock.cleanAll());
  beforeEach(() => {
    nock('https://jsonplaceholder.typicode.com')
      .get('/albums/3')
      .reply(200, albumResponse);
    factory.create('Album', { albumId: albumResponse.id, userId: 1, title: albumResponse.title });
  });

  test('Should be a succesfull album photo query', () => {
    nock('https://jsonplaceholder.typicode.com')
      .get('/albums/3/photos')
      .reply(200, photosResponse);
    return factory.create('User', user).then(() =>
      agent
        .get('/users/albums/3/photos')
        .set('x-access-token', token.createToken(user))
        .then(response => {
          expect(response.body).toHaveProperty('photos');
          return expect(response.statusCode).toBe(200);
        })
    );
  });

  test('Should be a succesfull album photo query', () => {
    nock('https://jsonplaceholder.typicode.com')
      .get('/albums/3/photos')
      .reply(200, photosResponse);
    return factory
      .create('User', user)
      .then(() => token.createToken(user))
      .then(tok =>
        agent
          .get('/users/albums/2/photos')
          .set('x-access-token', tok)
          .then(response => {
            expect(response.body).toHaveProperty('internal_code');
            return expect(response.statusCode).toBe(401);
          })
      );
  });
});
