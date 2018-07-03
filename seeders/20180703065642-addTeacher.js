'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
     
    */
    return queryInterface.bulkInsert('Teachers', [{
      firstName: 'Abdul',
      lastName: 'khorimun',
      email: 'abdul@gmail.com',
      SubjectId: 1,
      updatedAt: new Date(),
      createdAt: new Date()
    }, {
      firstName: 'butet',
      lastName: 'sinaga',
      email: 'bunaga@gmail.com',
      SubjectId: 2,
      updatedAt: new Date(),
      createdAt: new Date()

    },
    {
      firstName: 'iman',
      lastName: 'nuriman',
      email: 'imannur@gmail.com',
      SubjectId: 2,
      updatedAt: new Date(),
      createdAt: new Date()

    }], {});
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
