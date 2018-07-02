'use strict';
module.exports = (sequelize, DataTypes) => {
  var StudentSubject = sequelize.define('StudentSubject', {
    score: DataTypes.INTEGER,
    SubjectId: DataTypes.INTEGER,
    StudentId: DataTypes.INTEGER
  }, {});
  StudentSubject.associate = function (models) {
    // associations can be defined here
    StudentSubject.belongsTo(models.Student)
    StudentSubject.belongsTo(models.Subject)
    // models.Student.belongsTo('StudentSubjects')
    // models.Subject.belongsTo('StudentSubjects')
  };
  return StudentSubject;
};
