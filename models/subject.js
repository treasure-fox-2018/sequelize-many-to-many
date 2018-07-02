'use strict';
module.exports = (sequelize, DataTypes) => {
  var Subject = sequelize.define('Subject', {
    SubjectName: DataTypes.STRING
  }, {});
  Subject.associate = function (models) {
    Subject.hasMany(models.Teacher)
    // associations can be defined here
    Subject.belongsToMany(models.Student, {
      through: 'StudentSubjects'
    });
  };
  return Subject;
};
