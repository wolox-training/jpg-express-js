const { healthCheck } = require('./controllers/healthCheck');
const { getAlbums, getAlbumById } = require('./controllers/albums');
const { registerUser, singIn, getUsers } = require('./controllers/users');
const { registerValidator, sessionValidator } = require('../app/schemas/users');
const { checkError } = require('./middlewares/validatorSchema');

exports.init = app => {
  app.get('/health', healthCheck);
  app.get('/albums', getAlbums);
  app.get('/albums/:id/photos', getAlbumById);
  app.get('/users', getUsers);
  app.post('/users', [registerValidator, checkError], registerUser);
  app.post('/users/sessions', [sessionValidator, checkError], singIn);
};
