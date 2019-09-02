const albumService = require('../services/albums');
const logger = require('../logger');

let albums = [];

exports.getAlbums = (req, res) => {
  logger.info('Iniciando la consulta de albums');
  albumService
    .getAlbums()
    .then(response => {
      albums = response;
    })
    .then(() => {
      if (albums) {
        res.send(albums);
        logger.info('Envío de albums exitoso');
      } else res.status(404).send();
    })
    .catch(err => logger.err(err.message));
};

exports.getAlbumById = (req, res) => {
  logger.info('Iniciando la consulta de fotos');
  let photos = [];
  const albumId = req.params.id;
  albumService
    .getAlbumById(albumId)
    .then(response => {
      photos = response;
    })
    .then(() => {
      if (photos) {
        res.send(photos);
        logger.info('Envío de fotos exitoso');
      } else res.status(404).send();
    })
    .catch(err => logger.err(err.message));
};
