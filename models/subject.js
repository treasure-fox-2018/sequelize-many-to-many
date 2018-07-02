'use strict';
module.exports = (sequelize, DataTypes) => {
  var Subject = sequelize.define('Subject', {
    subject_name: DataTypes.STRING,
    createdAt: new Date(),
    updatedAt: new Date(),
  }, {});
  Subject.associate = function(models) {
    Subject.hasMany(models.Teacher)
  };
  return Subject;
};
