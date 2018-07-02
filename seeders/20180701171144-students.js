'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Students', [{
      first_name: 'John',
      last_name: 'Doe',
      email: 'john@sekolah.id',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      first_name: 'Hi',
      last_name: 'Jack',
      email: 'that@sekolah.id',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      first_name: 'Max',
      last_name: 'Mofoe',
      email: 'maxis@sekolah.id',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      first_name: 'Filthy',
      last_name: 'Frank',
      email: 'franku@sekolah.id',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Students', null, {});
  }
};
