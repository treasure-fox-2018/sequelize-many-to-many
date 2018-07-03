'use strict';
module.exports = (sequelize, DataTypes) => {
  var Subject = sequelize.define('Subject', {
    subject_name: DataTypes.STRING,
    teacher: DataTypes.STRING
  }, {});
  Subject.associate = function(models) {
    // associations can be defined here
    Subject.belongsToMany(models.Student, {through: models.StudentSubject})
  };
  return Subject;
};