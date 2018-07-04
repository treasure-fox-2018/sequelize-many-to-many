'use strict';
module.exports = (sequelize, DataTypes) => {
  var Student = sequelize.define('Student', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
  }, {});
  Student.associate = function(models) {
    Student.hasMany(models.StudentSubject)
    Student.belongsToMany(models.Subject, {through: models.StudentSubject})
  };


  Student.prototype.getFullName = function(value){
    return `${this.firstName} ${this.lastName}`
  }
  return Student;
};