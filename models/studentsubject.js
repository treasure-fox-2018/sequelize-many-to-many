'use strict';
module.exports = (sequelize, DataTypes) => {
  var StudentsSubject = sequelize.define('StudentsSubject', {
    StudentId: DataTypes.INTEGER,
    SubjectId: DataTypes.INTEGER
  }, {});
  StudentsSubject.associate = function(models) {
    // associations can be defined here
    StudentsSubject.belongsTo(models.Student)
    StudentsSubject.belongsTo(models.Subject)

  };
  return StudentsSubject;
};