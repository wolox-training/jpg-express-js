const { healthCheck } = require('./controllers/healthCheck');
const { getAlbums, getAlbumById } = require('./controllers/albums');
const { registerUser } = require('./controllers/users');
const { registerValidator } = require('../app/schemas/users');

exports.init = app => {
  app.get('/health', healthCheck);
  app.get('/albums', getAlbums);
  app.get('/albums/:id/photos', getAlbumById);
  app.post('/users', registerValidator, registerUser);
};
