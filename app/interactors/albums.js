const albums = require('../services/albums');
const albumDB = require('../services/albumDB');
const errors = require('../errors');

exports.buyAlbum = req => {
  const albumId = req.params.id;
  const userId = req.user.id;
  return albums.getAlbumById(albumId).then(response => {
    if (!response || response === {}) return Promise.reject(errors.notFoundError('album not exist'));
    return albumDB
      .buyAlbum({ albumId, userId, title: response.title })
      .then(() => Promise.resolve(response))
      .catch(() => Promise.reject(errors.requestError('album already purchased')));
  });
};
