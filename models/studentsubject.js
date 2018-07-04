'use strict';
module.exports = (sequelize, DataTypes) => {
  var StudentSubject = sequelize.define('StudentSubject', {
    SubjectId: DataTypes.INTEGER,
    StudentId: DataTypes.INTEGER,
    score: DataTypes.INTEGER,
  }, {});
  StudentSubject.associate = function(models) {
    // associations can be defined here
    StudentSubject.belongsTo(models.Student)
    StudentSubject.belongsTo(models.Subject)
  };
  return StudentSubject;
};