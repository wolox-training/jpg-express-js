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
  const query = { where: { userId } };
  return Album.findAll(query).catch(error => {
    logger.error(error);
    return Promise.reject(errors.databaseError(error.message));
  });
};

exports.getPhotosPurchasedAlbum = (userId, albumId) => {
  const query = { where: { userId, albumId } };
  return Album.findOne(query).catch(error => {
    logger.error(error);
    return Promise.reject(errors.databaseError(error.message));
  });
};
