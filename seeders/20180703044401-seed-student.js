'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Students', [
      {
        first_name: 'Akbar',
        last_name: 'Sahata',
        email: 'akbarsahata@mail.com',
        createdAt: new Date,
        updatedAt: new Date
      },
      {
        first_name: 'Dul',
        last_name: 'Sumbang',
        email: 'dulsumbang@mail.com',
        createdAt: new Date,
        updatedAt: new Date        
      },
      {
        first_name: 'Robb',
        last_name: 'Sena',
        email: 'robbsena@mail.com',
        createdAt: new Date,
        updatedAt: new Date
      }
    ], {});
  },
      

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Students', null, {});
  }
};
