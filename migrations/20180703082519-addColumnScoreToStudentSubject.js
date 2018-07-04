'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.addColumn("StudentSubjects", "score",{type:Sequelize.INTEGER, defaultValue:0},{} )
  },

  down: (queryInterface, Sequelize) => {
   return queryInterface.removeColumn("StudentSubjects", "score")
  }
};
