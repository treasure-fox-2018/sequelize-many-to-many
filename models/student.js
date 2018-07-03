'use strict';
module.exports = (sequelize, DataTypes) => {
  var Student = sequelize.define('Student', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING
  }, {});
  Student.associate = function(models) {
    // associations can be defined here
    // Project.belongsToMany(User, {through: 'UserProject'});
    Student.belongsToMany(models.Subject,{
      through: 'StudentSubject'
    })
    Student.hasMany(models.StudentSubject)
  };
  return Student;
};