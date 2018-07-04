'use strict';
module.exports = (sequelize, DataTypes) => {
  var Teacher = sequelize.define('Teacher', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    SubjectId: DataTypes.INTEGER,
  }, {});
  Teacher.associate = function(models) {
    Teacher.belongsTo(models.Subject)
  };

  Teacher.prototype.getFullName = function(value){
    return `${this.firstName} ${this.lastName}`
  }
  return Teacher;
};