'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.addColumn('Students','SubjectName', { type: Sequelize.STRING });
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.removeColumn('Students','SubjectName');
  }
};
