'use strict';
module.exports = (sequelize, DataTypes) => {
  var Subject = sequelize.define('Subject', {
    SubjectName: DataTypes.STRING
  }, {});
  Subject.associate = function(models) {
    // associations can be defined here
    // Subject.hasMany(models.Student),
    Subject.hasMany(models.Teacher)
    Subject.belongsToMany(models.Student,{"through":models.SubjectStudent})
  };
  return Subject;
};
