const albumService = require('../services/albums');
const logger = require('../logger');
const errors = require('../errors');

exports.getAlbums = (req, res, next) => {
  logger.info('Iniciando la consulta de albums');
  albumService
    .getAlbums()
    .then(response => {
      if (!response.length) return Promise.reject(errors.emptyData('data unavailable'));
      logger.info('Envío de albums exitoso');
      return res.send(response);
    })
    .catch(next);
};

exports.getAlbumById = (req, res, next) => {
  logger.info('Iniciando la consulta de fotos');
  const albumId = req.params.id;
  albumService
    .getAlbumById(albumId)
    .then(response => {
      if (!response.length) return Promise.reject(errors.emptyData('data unavailable'));
      logger.info('Envío de fotos exitoso');
      return res.send(response);
    })
    .catch(next);
};
