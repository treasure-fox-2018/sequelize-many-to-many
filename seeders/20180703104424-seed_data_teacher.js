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
    return queryInterface.bulkInsert('Teachers', [
      {FirstName:'Bambang', LastName:'Supaptro', Email:'bambangsuprapto@sekolah.id', SubjectId: 2, createdAt: new Date(), updatedAt: new Date()},
      {FirstName:'Rukmana', LastName:'Fatmawati', Email:'rukmanafatmawati@sekolah.id', SubjectId: 2, createdAt: new Date(), updatedAt: new Date()},
      {FirstName:'Butet', LastName:'Naborhu', Email:'butetnaborhu@sekolah.id', SubjectId: 1, createdAt: new Date(), updatedAt: new Date()},
      {FirstName:'Yulius', LastName:'Prawiranegara', Email:'yuliusprawinegara@sekolah.id', SubjectId: 1, createdAt: new Date(), updatedAt: new Date()}
    ], {})
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
