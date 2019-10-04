const { healthCheck } = require('./controllers/healthCheck');
const {
  getAlbums,
  getPhotosByAlbumId,
  buyAlbum,
  getPurchasedAlbums,
  getPhotosPurchasedAlbum
} = require('./controllers/albums');
const { registerUser, singIn, getUsers, registerAdmin, invalidateAll } = require('./controllers/users');
const { registerValidator, sessionValidator } = require('../app/schemas/users');
const { checkError } = require('./middlewares/validatorSchema');
const { auth } = require('./middlewares/auth');

const admin = true;

exports.init = app => {
  app.get('/health', healthCheck);
  app.get('/albums', getAlbums);
  app.get('/albums/:id/photos', getPhotosByAlbumId);
  app.get('/users', auth(), getUsers);
  app.post('/users', [registerValidator, checkError], registerUser);
  app.post('/users/sessions', [sessionValidator, checkError], singIn);
  app.post('/admin/users', [auth(admin), registerValidator, checkError], registerAdmin);
  app.post('/albums/:id', auth(), buyAlbum);
  app.get('/users/:userId/albums', auth(), getPurchasedAlbums);
  app.get('/users/albums/:id/photos', auth(), getPhotosPurchasedAlbum);
  app.post('/users/sessions/invalidate_all', auth(), invalidateAll);
};
