'use strict';
module.exports = (sequelize, DataTypes) => {
  var Student = sequelize.define('Student', {
    FirstName: DataTypes.STRING,
    LastName: DataTypes.STRING,
    Email: DataTypes.STRING,
    SubjectName: DataTypes.STRING
  }, {});
  Student.associate = function(models) {
    // associations can be defined here
    // Student.belongsTo(models.Subject),
    Student.belongsToMany(models.Subject,{"through":models.SubjectStudent})
  };
  return Student;
};
