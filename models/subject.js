'use strict';
module.exports = (sequelize, DataTypes) => {
  var Subject = sequelize.define('Subject', {
    subjectName: DataTypes.STRING
  }, {});
  Subject.associate = function(models) {
      Subject.belongsToMany(models.Student, {through: 'SubjectStudent'})
      Subject.hasMany(models.SubjectStudent)
  };
  return Subject;
};
