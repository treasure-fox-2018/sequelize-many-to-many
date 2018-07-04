'use strict';
module.exports = (sequelize, DataTypes) => {
  var Student = sequelize.define('Student', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: DataTypes.STRING,
    SubjectId: DataTypes.INTEGER,
    TeacherId: DataTypes.INTEGER
  }, {});
  Student.associate = function(models) {
    // associations can be defined here
    Student.hasMany(models.StudentSubject)
    Student.belongsToMany(models.Subject,{through: 'StudentSubject'})
  };

  Student.prototype.getFullName = function(){
    let firstName = this.first_name;
    let lastName = this.last_name;
    return `${firstName} ${lastName}`
  }
  return Student;
};