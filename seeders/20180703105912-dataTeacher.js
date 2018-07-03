'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      
    */
   return queryInterface.bulkInsert('Teachers', 
    [
      {
       teacherName: 'Yulius Prawiranegara',
       createdAt: new Date(),
       updatedAt: new Date()
      },
      {
        teacherName: 'Butet Naiborhu',
        createdAt: new Date(),
        updatedAt: new Date()
       },
       {
        teacherName: 'Bambang Suprapto',
        createdAt: new Date(),
        updatedAt: new Date()
       },
       {
        teacherName: 'Rukmana Fatmawati',
        createdAt: new Date(),
        updatedAt: new Date()
       }

    ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};
