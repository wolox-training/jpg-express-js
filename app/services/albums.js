const rq = require('request-promise');
const errors = require('../errors');
const logger = require('../logger');
const { Album } = require('../models');

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
    return Promise.reject(errors.requestError('album does not exist'));
  });
};

exports.buyAlbum = album =>
  Album.create(album)
    .then(resp => Promise.resolve({ purchased: resp }))
    .catch(error => {
      logger.error(error);
      return Promise.reject(errors.databaseError('album not purchased'));
    });
