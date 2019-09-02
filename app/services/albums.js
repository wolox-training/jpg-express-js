const rq = require('request-promise');

const { urlApi } = require('../../config').common.resources;

exports.getAlbums = () => {
  const options = {
    method: 'GET',
    uri: `${urlApi}/albums`,
    json: true
  };
  return rq(options);
};

exports.getAlbumById = albumId => {
  const options = {
    method: 'GET',
    uri: `${urlApi}/photos?albumId=${albumId}`,
    json: true
  };
  return rq(options);
};
