'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert("Subjects",[{
        subjectName : "Fisika",
      },{
        subjectName : "Ekonomi",
      }],{})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Subjetcs", null,{})
  }
};
