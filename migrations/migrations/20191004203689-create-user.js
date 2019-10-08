const moment = require('moment');

module.exports = {
  up: (queryInterface, sequelize) =>
    queryInterface.addColumn('users', 'session', {
      type: sequelize.INTEGER,
      defaultValue: moment().unix(),
      allowNull: true
    }),
  down: queryInterface => queryInterface.removeColumn('users', 'session')
};
