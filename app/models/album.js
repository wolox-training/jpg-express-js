'use strict';
module.exports = (sequelize, DataTypes) => {
  const Album = sequelize.define(
    'Album',
    {
      userId: { type: DataTypes.INTEGER, primaryKey: true, allowNull: false, field: 'user_id' },
      albumId: { type: DataTypes.INTEGER, primaryKey: true, allowNull: false, field: 'album_id' },
      title: { type: DataTypes.STRING, allowNull: false }
    },
    { tableName: 'albums', underscored: true, timestamps: true }
  );
  return Album;
};
