'use strict';
module.exports = (sequelize, DataTypes) => {
  var Student = sequelize.define('Student', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          args: true,
          msg: 'Wrong email format!'
        },
        isUnique: (value, cb) => {
          Student.find({
            where: {email: value}
          })
          .then( (email) => {
            if (email !== null) {
              cb ('Email already used!');
            }
            cb(null);
          });
        }
      }
    },
  }, {});

  Student.associate = function(models) {
    Student.hasMany(models.Studentsubject)
    Student.belongsToMany(models.Subject, {through: models.Studentsubject})
  };
  return Student;
};