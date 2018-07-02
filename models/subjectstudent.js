'use strict';
module.exports = (sequelize, DataTypes) => {
  var SubjectStudent = sequelize.define('SubjectStudent', {
    StudentId: DataTypes.INTEGER,
    SubjectId: DataTypes.STRING
  }, {});
  SubjectStudent.associate = function(models) {
      SubjectStudent.belongsTo(models.student)
      SubjectStudent.belongsTo(models.subject)
  };
  return SubjectStudent;
};
