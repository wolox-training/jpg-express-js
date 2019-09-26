const albumService = require('../services/albums');
const logger = require('../logger');
const errors = require('../errors');

exports.getAlbums = (req, res, next) => {
  logger.info('Starting the albums query');
  return albumService
    .getAlbums()
    .then(response => {
      if (!response.length) return Promise.reject(errors.emptyData('data unavailable'));
      logger.info('albums sended successfully');
      return res.send(response);
    })
    .catch(next);
};

exports.getAlbumById = (req, res, next) => {
  logger.info('starting the photo query');
  const albumId = req.params.id;
  return albumService
    .getAlbumById(albumId)
    .then(response => {
      if (!response.length) return Promise.reject(errors.emptyData('data unavailable'));
      logger.info('photos sended successfully');
      return res.send(response);
    })
    .catch(next);
};

exports.buyAlbum = (req, res, next) => {
  logger.info('starting the photo query');
  const albumId = req.params.id;
  return albumService
    .buyAlbumById(albumId)
    .then(response => {
      if (!response.length) return Promise.reject(errors.emptyData('data unavailable'));
      logger.info('album purchased successfully');
      return res.send({ response });
    })
    .catch(next);
};
