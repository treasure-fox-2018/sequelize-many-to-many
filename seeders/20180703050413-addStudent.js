'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Students", [{
      firstName : "Akbar",
      lastName : "Sahata",
      email:"akbarsahata@mail.com",
    },{
      firstName : "Agindo",
      lastName : "Rahmat",
      email:"agindorahmat@mail.com",
    },{
      firstName : "Dul",
      lastName : "Sumbang",
      email:"dulsumbang@mail.com",
    }],{})
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete("Teachers", null, {})
  }
};
