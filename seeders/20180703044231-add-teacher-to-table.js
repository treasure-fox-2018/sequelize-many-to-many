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
   return queryInterface.bulkInsert('Teachers', 
   [{
    first_name: "Nikolas",
    last_name: "Friesen",
    email: "agustina_braun@wintheiser.com",
    SubjectId: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    first_name: "Randi",
    last_name: "Halvorson",
    email: "heber.upton@bechtelarwisozk.com",
    SubjectId: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    first_name: "Sally",
    last_name: "Buridge",
    email: "nora@treutel.com",
    SubjectId: 2,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    first_name: "Morris",
    last_name: "Swift",
    email: "cordell@sanfordkuhlman.org",
    SubjectId: 2,
    createdAt: new Date(),
    updatedAt: new Date()
  }], {});
   
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
    return queryInterface.bulkDelete('Teachers', null, {});
  }
};
