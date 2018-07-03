'use strict';
module.exports = (sequelize, DataTypes) => {
  var Subject = sequelize.define('Subject', {
    subjectName: DataTypes.STRING
  }, {});
  Subject.associate = function(models) {
    Subject.belongsToMany(models.Student,{through: models.SubjectStudent})
    Subject.hasMany(models.SubjectStudent)
    Subject.hasMany(models.Teacher)
  };
  return Subject;
};