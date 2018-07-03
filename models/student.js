'use strict';
module.exports = (sequelize, DataTypes) => {
  const Op = sequelize.Op;
  var Student = sequelize.define('Student', {
    first_name: {
      type: DataTypes.STRING,
    validate: {
      notEmpty: {
        msg: "first name must be filled!"
      }
    }},
    last_name: {
      type: DataTypes.STRING,
    validate: {
      notEmpty: {
        msg: "last name must be filled!"
      }
    }},
    email: {
      type:DataTypes.STRING,
      validate:{
        isEmail:true,
        unique: function(value,next) {
          Student.findOne({
            where: {email: value,
              id: {[Op.ne]: this.id}},
          })
          .then(user=>{
            // console.log(user.id);
            // console.log(Student.id);
            if (user !== null) {
              return next('email is already used')
            }else {
              next()
            }
          })
          .catch(function (err) {
            return next(err);
          })
        }},
      },
    }, {});
    Student.associate = function(models) {
      Student.belongsToMany(models.Subject, { through: models.StudentSubject})
      Student.hasMany(models.StudentSubject)
    };
    return Student;
  };
