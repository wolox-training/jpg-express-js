'use strict';
module.exports = (sequelize, DataTypes) => {
  const Usuario = sequelize.define(
    'Usuario',
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, unique: true, allowNull: false },
      nombre: { type: DataTypes.STRING, allowNull: false },
      apellido: { type: DataTypes.STRING, allowNull: false },
      email: { type: DataTypes.STRING, unique: true, allowNull: false },
      contrasena: { type: DataTypes.STRING, allowNull: false }
    },
    {}
  );
  return Usuario;
};
