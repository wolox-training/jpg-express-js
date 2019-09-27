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
    {
      tableName: 'users',
      underscored: true
    }
  );
  return User;
};
