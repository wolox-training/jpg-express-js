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
