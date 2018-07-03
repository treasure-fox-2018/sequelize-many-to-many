'use strict';
module.exports = (sequelize, DataTypes) => {
  var SubjectStudent = sequelize.define('SubjectStudent', {
    SubjectId: DataTypes.INTEGER,
    StudentId: DataTypes.INTEGER,
    score : DataTypes.INTEGER
  }, {});
  SubjectStudent.associate = function(models) {
    // associations can be defined here
    SubjectStudent.belongsTo(models.Student)
    SubjectStudent.belongsTo(models.Subject)
  };
  return SubjectStudent;
};