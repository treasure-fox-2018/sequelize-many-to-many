'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
     return [
       queryInterface.addColumn('Teachers','SubjectId', { type: Sequelize.INTEGER }),
       queryInterface.addColumn('Teachers','StudentId', { type: Sequelize.INTEGER })
      ]
       
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
     return [
       queryInterface.removeColumn('Teachers','SubjectId'),
       queryInterface.removeColumn('Teachers','StudentId')
     ]
  }
};
