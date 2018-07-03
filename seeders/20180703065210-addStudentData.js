'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
   return queryInterface.bulkInsert('Students', [
      {
        firstName :"Budi",
        lastName : "Anggraini",
        email : "budianggraini@sekolah.id",
        createdAt : new Date,
        updatedAt : new Date
      },
      {
        firstName :"dwi",
        lastName : "Fatmawati",
        email : "dwifatmawati@sekolah.id",
        createdAt : new Date,
        updatedAt : new Date
      },
      {
        firstName :"Bambang",
        lastName : "Naiborhu",
        email : "bambangnaiborhu@sekolah.id",
        createdAt : new Date,
        updatedAt : new Date
      },
      {
        firstName :"Sonny",
        lastName : "Prawiranegara",
        email : "sonnyprawiranegara@sekolah.id",
        createdAt : new Date,
        updatedAt : new Date
      }
    ])
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
   return queryInterface.bulkDelete('Students', null, {});
  }
};
