'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.
    */
   return queryInterface.bulkInsert('Students',
    [
      {
        firstName: 'Akbar',
        LastName: 'Sahata',
        email: 'akbarsahata@mail.com',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstName: 'Agindo',
        LastName: 'Rahmat',
        email: 'agindorahmat@mail.com',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
      firstName: 'Dul',
      LastName: 'Sumbang',
      email: 'dulsumbang@mail.com',
      createdAt: new Date(),
        updatedAt: new Date()
      },


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
