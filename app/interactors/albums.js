const albums = require('../services/albums');
const albumDB = require('../services/albumDB');
const errors = require('../errors');
const serializer = require('../serializers/albums');
const logger = require('../logger');

exports.buyAlbum = req => {
  const albumId = req.params.id;
  const userId = req.user.id;
  return albums.getAlbumById(albumId).then(response => {
    if (!response || response === {}) return Promise.reject(errors.notFoundError('album not exist'));
    return albumDB
      .buyAlbum({ albumId, userId, title: response.title })
      .then(() => Promise.resolve(response))
      .catch(() => Promise.reject(errors.requestError('album already purchased')));
  });
};

exports.getPurchasedAlbums = req => {
  const { userId } = req.params;
  if (!req.user.admin && req.user.id !== parseInt(userId))
    return Promise.reject(errors.notAuthError('user dont have permissons'));
  return albumDB.getPurchasedAlbums(userId).then(response => {
    if (!response.length)
      return Promise.reject(errors.notFoundError('user dont have purchased albums already'));
    logger.info('Succssesfull albums query');
    return serializer.albumPurchasedResponse(response, userId);
  });
};

exports.getPhotosPurchasedAlbum = req => {
  const albumId = req.params.id;
  const userId = req.user.id;
  return albumDB.getPhotosPurchasedAlbum(userId, albumId).then(response => {
    if (!response) return Promise.reject(errors.notFoundError('user dont have this album already'));
    return albums
      .getPhotosByAlbumId(albumId)
      .catch(() => Promise.reject(errors.requestError('photos not available')));
  });
};
