const albums = require('../services/albums');
const errors = require('../errors');

exports.buyAlbum = req => {
  const albumId = req.params.id;
  const userId = req.user.id;
  return albums.getAlbumById(albumId).then(response => {
    console.log(response, 'resp********');
    if (!response) return Promise.reject(errors.userExistsError('album does not exist'));
    return albums.buyAlbum({ albumId, userId, title: response.title }).then(res => {
      if (!res) return Promise.reject(errors.userExistsError('fail to purchase album'));
      return Promise.resolve(response);
    });
  });
};
