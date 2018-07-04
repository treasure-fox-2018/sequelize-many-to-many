'use strict';
module.exports = (sequelize, DataTypes) => {
  var Subject = sequelize.define('Subject', {
    subject_name: DataTypes.STRING,
  }, {hooks: {
    beforeCreate: (subject,option) => {
      subject.createdAt = new Date();
      subject.updatedAt = new Date();
    }
  }});
  Subject.associate = function(models) {
    Subject.belongsToMany(models.Student, {through: models.StudentSubject})
    Subject.hasMany(models.StudentSubject)
    Subject.hasMany(models.Teacher)
  };
  return Subject;
};