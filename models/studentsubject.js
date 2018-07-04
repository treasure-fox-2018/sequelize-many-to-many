'use strict';
module.exports = (sequelize, DataTypes) => {
  var StudentSubject = sequelize.define('StudentSubject', {
    StudentId: DataTypes.INTEGER,
    score: DataTypes.INTEGER,
  }, {hooks: {
    beforeCreate: (subject,option) => {
      subject.createdAt = new Date();
      subject.updatedAt = new Date();
    }
  }});
  StudentSubject.associate = function(models) {
    StudentSubject.belongsTo(models.Subject)
    StudentSubject.belongsTo(models.Student)
  };
  return StudentSubject;
};