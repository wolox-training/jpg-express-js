const albumService = require('../services/albums');
const logger = require('../logger');
const errors = require('../errors');
const interactor = require('../interactors/albums');

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

exports.getPhotosByAlbumId = (req, res, next) => {
  logger.info('starting the photo query');
  const albumId = req.params.id;
  return albumService
    .getPhotosByAlbumId(albumId)
    .then(response => {
      if (!response.length) return Promise.reject(errors.emptyData('data unavailable'));
      logger.info('photos sended successfully');
      return res.send(response);
    })
    .catch(next);
};

exports.buyAlbum = (req, res, next) => {
  logger.info('starting the album query');
  return interactor
    .buyAlbum(req)
    .then(response => {
      logger.info('photos purchased successfully');
      return res.send(response);
    })
    .catch(next);
};
