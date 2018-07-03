'use strict';
module.exports = (sequelize, DataTypes) => {
  var Studentsubject = sequelize.define('Studentsubject', {
    StudentId: DataTypes.INTEGER,
    SubjectId: DataTypes.INTEGER
  }, {});
  Studentsubject.associate = function(models) {
    Studentsubject.belongsTo(models.Student)
    Studentsubject.belongsTo(models.Subject)
  };
  return Studentsubject;
};