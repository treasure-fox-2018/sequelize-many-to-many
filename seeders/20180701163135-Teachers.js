'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Teachers', [{
      first_name: 'Bambang',
      last_name: 'Suprapto',
      createdAt: new Date(),
      updatedAt: new Date(),
      email: 'bambangsuprapto@sekolah.id',
    },{
      first_name: 'Rukmana',
      last_name: 'Fatmawati',
      createdAt: new Date(),
      updatedAt: new Date(),
      email: 'rukmanafatmawati@sekolah.id',
    },{
      first_name: 'Butet',
      last_name: 'Naiborhu',
      createdAt: new Date(),
      updatedAt: new Date(),
      email: 'butetnaiborhu@sekolah.id',
    },{
      first_name: 'Yulius',
      last_name: 'Prawiranegara',
      createdAt: new Date(),
      updatedAt: new Date(),
      email: 'yuliusprawiranegara@sekolah.id',
    },
    ], {});
    
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Teachers', null, {});
  }
};
