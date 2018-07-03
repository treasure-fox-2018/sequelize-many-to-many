'use strict';
module.exports = (sequelize, DataTypes) => {
  var Teacher = sequelize.define('Teacher', {
    teacherName: DataTypes.STRING
  }, {});
  Teacher.associate = function(models) {
    // associations can be defined here
  };
  return Teacher;
};