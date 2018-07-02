'use strict';
module.exports = (sequelize, DataTypes) => {
  var Subject = sequelize.define('Subject', {
    subjectName: DataTypes.STRING
  }, {});
  Subject.associate = function(models) {
    // associations can be defined here
    Subject.hasMany(models.Teacher)
    Subject.hasMany(models.StudentSubject);
    Subject.belongsTo(models.Student, {through: 'StudentSubject'})
  };
  return Subject;
};