const { factory } = require('factory-girl');
const request = require('supertest');
const nock = require('nock');
const app = require('../../../../app');
const { mockAlbum } = require('../../../mocks/albums');
const { mockUser2 } = require('../../../mocks/users');

describe('POST /albums/:id', () => {
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

  it('should be a successfull album shop', () => {
    nock('https://jsonplaceholder.typicode.com')
      .get('/albums/2')
      .reply(200, mockAlbum);
    return request(app)
      .post('/users/sessions')
      .send({ email: mockEmail, password: mockPass })
      .then(response =>
        request(app)
          .post('/albums/2')
          .set({ 'x-access-token': response.body.token })
      )
      .then(response => {
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('userId');
      });
  });

  it('should fail a shop due to a bad token', () => {
    request(app)
      .post('/albums/2')
      .set({ 'x-access-token': 'bad-token' })
      .then(response => {
        expect(response.status).toBe(401);
      });
  });

  it('should be fail album query due to a non existent album', () =>
    factory.create('User', { ...mockUser2, password }).then(() =>
      request(app)
        .post('/users/sessions')
        .send({ email: mockUser2.email, password: mockPass })
        .then(response =>
          request(app)
            .post('/albums/')
            .set({ 'x-access-token': response.body.token })
        )
        .then(response => {
          expect(response.statusCode).toBe(401);
        })
    ));
});
