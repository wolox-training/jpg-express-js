exports.albumPurchasedResponse = (response, userId) => {
  const albums = response.map(album => ({ album_id: album.albumId, title: album.title }));
  return { user_id: userId, purchased_albums: albums };
};
