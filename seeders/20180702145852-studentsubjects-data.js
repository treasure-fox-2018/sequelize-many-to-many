'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

      return queryInterface.bulkInsert('StudentSubjects', [{
        StudentId: 12,
        SubjectId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      }], {});

  },

  down: (queryInterface, Sequelize) => {


      return queryInterface.bulkDelete('StudentSubjects', null, {});

  }
};
