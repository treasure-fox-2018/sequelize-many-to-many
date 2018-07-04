'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
   return queryInterface.bulkInsert("Teachers", [{
    firstName: "Bambang",
    lastName : "Supratpto",
    email : "bambangsuprapto@sekolah.id",
  },{
    firstName: "Rukamana",
    lastName : "Fatmawati",
    email : "RukamanaFatmawati@sekolah.id",
  },{
    firstName: "Butet",
    lastName : "Nairbohu",
    email : "ButetNairbohu@sekolah.id",
  },{
    firstName: "Yulius",
    lastName : "Prawiranegara",
    email : "yuliusprawiranegara@sekolah.id",
  }],{})
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
      return queryInterface.bulkDelete("Teachers", null,{})
  }
};
