'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.addColumn('SubjectStudents', 'SubjectId', {
          type: Sequelize.INTEGER,
      })
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.removeColumn('SubjectStudents', 'SubjectId');
  }
};
