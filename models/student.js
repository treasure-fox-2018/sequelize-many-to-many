'use strict';
module.exports = (sequelize, DataTypes) => {
  var Student = sequelize.define('Student', {
    firstName: DataTypes.STRING,
    LastName: DataTypes.STRING,
    email: DataTypes.STRING,
    subjectName: DataTypes.STRING
  }, {});
  Student.associate = function(models) {
    // associations can be defined here
    Student.belongsToMany(models.Subject,{"through" : models.SubjectStudent})
    //student memiliki banyak subject, di jembatani dengan idsubject dan idstudent (models)
  };
  return Student;
};