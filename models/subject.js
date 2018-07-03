'use strict';
module.exports = (sequelize, DataTypes) => {
  var Subject = sequelize.define('Subject', {
    name: {
      type: DataTypes.STRING,
    validate: {
      notNull: {
        msg: "subject name must be filled!"
      }
    }}
  }, {});
  Subject.associate = function(models) {
    // associations can be defined here
    Subject.hasMany(models.Teacher)
    Subject.belongsToMany(models.Student, { through: models.StudentSubject})
    Subject.hasMany(models.StudentSubject)
  };
  return Subject;
};
