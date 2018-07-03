'use strict';
module.exports = (sequelize, DataTypes) => {
  var SubjectStudent = sequelize.define('SubjectStudent', {
    SubjectId: DataTypes.INTEGER,
    StudentId: DataTypes.INTEGER
  }, {});
  SubjectStudent.associate = function(models) {
    // associations can be defined here
  };
  return SubjectStudent;
};