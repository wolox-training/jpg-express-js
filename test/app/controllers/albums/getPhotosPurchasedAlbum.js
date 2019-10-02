const request = require('supertest');
const nock = require('nock');
const app = require('../../../../app');
const { User } = require('../../../../app/models');
const token = require('../../../../app/helpers/token');

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

describe('GET /users/albums/:id/photos', () => {
  afterEach(() => nock.cleanAll());

  beforeEach(() => {
    nock('https://jsonplaceholder.typicode.com')
      .get('/albums/3')
      .reply(200, albumResponse);
  });

  test('Should be a succesfull album photo query', () => {
    nock('https://jsonplaceholder.typicode.com')
      .get('/albums/3/photos')
      .reply(200, photosResponse);
    const user = {
      name: 'camilo',
      lastName: 'lopez',
      email: 'camilopez@wolox.co',
      password: '$2b$10$NJFKv8olocR3AdUvNO4If.ekoV2q/6qZDgSoCbsMQrcLcmdiis6ee'
    };
    return User.create({ ...user, admin: true })
      .then(() => token.createToken(user))
      .then(tok =>
        agent
          .post('/albums/3')
          .set('x-access-token', tok)
          .then(() =>
            agent
              .get('/users/albums/3/photos')
              .set('x-access-token', tok)
              .then(response => expect(response.statusCode).toBe(200))
          )
      );
  });

  // test('Test logged user not purchased album. It should fail with code 422', async () => {
  //   const logIn = await helper.createUserAndLogin('standard');
  //   const response = await request(app)
  //     .get('/users/albums/54/photos')
  //     .set({ Authorization: logIn.headers.authorization });
  //   return expect(response.statusCode).toBe(422);
  // });
});
