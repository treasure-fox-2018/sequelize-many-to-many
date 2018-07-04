'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Subjects', [
      {
      subject_name: 'Fisika',
      createdAt: new Date,
      updatedAt: new Date
    },{
      subject_name:'Ekonomi',
      createdAt: new Date,
      updatedAt: new Date
    },{
      subject_name:'Matematika',
      createdAt: new Date,
      updatedAt: new Date
    } 
  ], {});
},
    
  
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Subjects', null, {});
  }
};
