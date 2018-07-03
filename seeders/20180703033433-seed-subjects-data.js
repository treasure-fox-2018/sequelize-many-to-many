'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Subjects',
      [
        {
          subjectName: 'Kimia',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          subjectName: 'Ekonomi',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          subjectName: 'Fisika',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          subjectName: 'Biologi',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          subjectName: 'Matematika',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          subjectName: 'Bahasa',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          subjectName: 'Antropologi',
          createdAt: new Date(),
          updatedAt: new Date(),
        }
      ], {})
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Subjects', null, {})
  }
}
