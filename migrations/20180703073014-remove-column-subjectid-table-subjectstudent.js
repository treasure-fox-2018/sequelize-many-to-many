'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.removeColumn('SubjectStudents', 'SubjectId');
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('SubjectStudents', 'SubjectId', {
        type: Sequelize.INTEGER,
    })
  }
};
