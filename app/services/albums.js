const rq = require('request-promise');
const errors = require('../errors');
const logger = require('../logger');

const { urlApi } = require('../../config').common.resources;

exports.getAlbums = () => {
  const options = {
    method: 'GET',
    uri: `${urlApi}/albums`,
    json: true
  };
  return rq(options).catch(error => {
    logger.error(error);
    return Promise.reject(errors.requestError('Bad request'));
  });
};

exports.getPhotosByAlbumId = albumId => {
  const options = {
    method: 'GET',
    uri: `${urlApi}/photos?albumId=${albumId}`,
    json: true
  };
  return rq(options).catch(error => {
    logger.error(error);
    return Promise.reject(errors.requestError('Bad request'));
  });
};

exports.getAlbumById = albumId => {
  const options = {
    method: 'GET',
    uri: `${urlApi}/albums/${albumId}`,
    json: true
  };
  return rq(options).catch(error => {
    logger.error(error);
    return Promise.reject(errors.notFoundError('album does not exist'));
  });
};
