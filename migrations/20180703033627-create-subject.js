'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Subjects', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      subject_name: {
        type: Sequelize.STRING
      },
      TeacherId: {
        type: Sequelize.INTEGER
      },
      StudentId: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new DATE()
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new DATE()
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Subjects');
  }
};