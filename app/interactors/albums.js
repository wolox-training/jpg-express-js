const albums = require('../services/albums');
const errors = require('../errors');

exports.buyAlbum = req => {
  const albumId = req.params.id;
  const userId = req.user.id;
  return albums
    .getAlbumById(albumId)
    .then(response =>
      albums
        .buyAlbum({ albumId, userId, title: response.title })
        .then(() => Promise.resolve(response))
        .catch(() => Promise.reject(errors.requestError('album already purchased')))
    )
    .catch(error => Promise.reject(errors.requestError(error.message)));
};
