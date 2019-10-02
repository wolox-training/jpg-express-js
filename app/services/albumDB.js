const logger = require('../logger');
const errors = require('../errors');
const { Album } = require('../models');

exports.buyAlbum = album =>
  Album.create(album)
    .then(resp => Promise.resolve({ purchased: resp }))
    .catch(error => {
      logger.error(error);
      return Promise.reject(errors.databaseError('album not purchased'));
    });

exports.getPurchasedAlbums = userId => {
  const query = { where: { user_id: userId } };
  return Album.findAll(query).catch(error => {
    logger.error(error);
    return Promise.reject(errors.databaseError(error.message));
  });
};

exports.getPhotosPurchasedAlbum = (userId, albumId) => {
  const query = { where: { user_id: userId, album_id: albumId } };
  return Album.findOne(query).catch(error => {
    logger.error(error);
    return Promise.reject(errors.databaseError(error.message));
  });
};
