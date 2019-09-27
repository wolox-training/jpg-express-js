'use strict';
module.exports = {
  up: (queryInterface, sequelize) =>
    queryInterface.addColumn('users', 'admin', {
      type: sequelize.BOOLEAN,
      allowNull: true
    }),
  down: queryInterface => queryInterface.removeColumn('users', 'admin')
};
