'use strict';
module.exports = (sequelize, DataTypes) => {
  const Album = sequelize.define(
    'Album',
    {
      providerId: { type: DataTypes.INTEGER, allowNull: false, field: 'provider_id' },
      title: { type: DataTypes.STRING, allowNull: false }
    },
    { tableName: 'albums', underscored: true, timestamps: true }
  );
  // Album.associate = models => {
  //   Album.belongsToMany(models.User, {
  //     through: 'UsersAlbum',
  //     foreignKey: 'user_id',
  //     as: 'user'
  //   });
  // };
  return Album;
};
