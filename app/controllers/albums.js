const rq = require('request-promise');

const { urlApi } = require('../../config').common.resources;

let albums = [];

exports.getAlbums = (req, res) => {
  const options = {
    method: 'GET',
    uri: `${urlApi}/albums`,
    json: true
  };
  rq(options)
    .then(response => {
      albums = response;
    })
    .then(() => {
      if (albums) res.send(albums);
      else res.status(404).send();
    })
    .catch(err => console.log(err.message));
};

exports.getAlbumById = (req, res) => {
  let photos = [];
  const albumId = req.params.id;
  const options = {
    method: 'GET',
    uri: `${urlApi}/photos?albumId=${albumId}`,
    json: true
  };
  rq(options)
    .then(response => {
      photos = response;
    })
    .then(() => {
      if (photos) res.send(photos);
      else res.status(404).send();
    })
    .catch(err => console.log(err.message));
};
