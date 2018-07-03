'use strict';
module.exports = (sequelize, DataTypes) => {
  var Subject = sequelize.define('Subject', {
    subject_name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true,
      },
    },
    createdAt: new Date(),
    updatedAt: new Date(),
  }, {});
  Subject.associate = function(models) {
    Subject.hasMany(models.Teacher);
    Subject.belongsToMany(models.Student, {through: "StudentSubject"});
  };
  return Subject;
};
