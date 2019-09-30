'use strict';

module.exports = {
  up: queryInterface =>
    queryInterface.bulkInsert('users', [
      {
        name: 'Juan',
        last_name: 'Gomez',
        email: 'juan@wolox.co',
        password: '$2b$10$q0/nJGRvSyZz3i7fgvTY2OwMl4MPozMQI/62Bkz5F88tSl.3Y2W4u',
        admin: true,
        created_at: new Date(),
        updated_at: new Date()
      }
    ]),
  down: queryInterface => queryInterface.bulkDelete('users')
};
