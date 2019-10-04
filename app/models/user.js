'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      name: { type: DataTypes.STRING, allowNull: false },
      lastName: { type: DataTypes.STRING, allowNull: false, field: 'last_name' },
      email: { type: DataTypes.STRING, unique: true, allowNull: false, validate: { isEmail: true } },
      password: { type: DataTypes.STRING, allowNull: false, validate: { min: 8 } },
      admin: { type: DataTypes.BOOLEAN, allowNull: true },
      session: { type: DataTypes.INTEGER, allowNull: false, defaultValue: process.env.secret }
    },
    { tableName: 'users', underscored: true, timestamps: true }
  );
  return User;
};
