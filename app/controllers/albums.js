const albumService = require('../services/albums');
const logger = require('../logger');
const errors = require('../errors');
// const { Album } = require('../models');

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
    .getPhotosByAlbumId(albumId)
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
  return albumService.getAlbumById(albumId).then(response => {
    if (!response) return Promise.reject(errors.defaultError('data unavailable'));
    return Promise.resolve(
      albumService
        .buyAlbum(response)
        .then(rex => console.log(rex))
        .then(rest => res.status(200).send(rest))
        .catch(next)
    );
  });
};
