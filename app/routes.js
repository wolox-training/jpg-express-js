const { healthCheck } = require('./controllers/healthCheck');
const { getAlbums, getAlbumById } = require('./controllers/albums');
const { registerUser, singIn, getUsers, registerAdmin } = require('./controllers/users');
const { registerValidator, sessionValidator } = require('../app/schemas/users');
const { checkError } = require('./middlewares/validatorSchema');
const { auth } = require('./middlewares/auth');

exports.init = app => {
  app.get('/health', healthCheck);
  app.get('/albums', getAlbums);
  app.get('/albums/:id/photos', getAlbumById);
  app.get('/users', auth, getUsers);
  app.post('/users', [registerValidator, checkError], registerUser);
  app.post('/users/sessions', [sessionValidator, checkError], singIn);
  app.post('/admin/users', [registerValidator, checkError], registerAdmin);
};
