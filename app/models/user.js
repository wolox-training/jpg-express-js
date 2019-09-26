'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      name: { type: DataTypes.STRING, allowNull: false },
      lastName: { type: DataTypes.STRING, allowNull: false, field: 'last_name' },
      email: { type: DataTypes.STRING, unique: true, allowNull: false, validate: { isEmail: true } },
      password: { type: DataTypes.STRING, allowNull: false, validate: { min: 8 } },
      admin: { type: DataTypes.BOOLEAN, allowNull: true }
    },
    { tableName: 'albums', underscored: true, timestamps: true }
  );
  // User.associate = models => {
  //   User.belongsToMany(models.Album, {
  //     through: 'UsersAlbum',
  //     foreignKey: 'album_id',
  //     as: 'album'
  //   });
  // };
  return User;
};
