'use strict';
module.exports = (sequelize, DataTypes) => {
  var Subject = sequelize.define('Subject', {
    subject_name: DataTypes.STRING,
    TeacherId: DataTypes.INTEGER,
    StudentId: DataTypes.INTEGER
  }, {});
  Subject.associate = function(models) {
    // associations can be defined here
    Subject.hasMany(models.StudentSubject)
    Subject.belongsToMany(models.Student,{through:'StudentSubject'})
  };
  return Subject;
};