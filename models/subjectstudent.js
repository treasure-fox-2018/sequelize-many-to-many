'use strict';
module.exports = (sequelize, DataTypes) => {
  var SubjectStudent = sequelize.define('SubjectStudent', {
      StudentId: DataTypes.INTEGER,
      SubjectId: DataTypes.INTEGER,
      score: DataTypes.INTEGER
    }, {}
  )

  SubjectStudent.associate = function(models) {
      SubjectStudent.belongsTo(models.Student)
      SubjectStudent.belongsTo(models.Subject)
  }

  return SubjectStudent;
}
