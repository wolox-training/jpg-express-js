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
      return res.status(200).send(response);
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
      return res.status(200).send(response);
    })
    .catch(next);
};

exports.buyAlbum = (req, res, next) => {
  logger.info('starting the album query');
  return interactor
    .buyAlbum(req)
    .then(response => {
      logger.info('album purchased successfully');
      return res.status(200).send(response);
    })
    .catch(next);
};

exports.getPurchasedAlbums = (req, res, next) => {
  logger.info('starting the album query');
  return interactor
    .getPurchasedAlbums(req)
    .then(response => {
      logger.info('succesfull purchased albums query');
      return res.status(200).send(response);
    })
    .catch(next);
};
