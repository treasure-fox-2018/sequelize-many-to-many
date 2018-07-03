'use strict';
module.exports = (sequelize, DataTypes) => {
  const Op = sequelize.Op
  var Student = sequelize.define('Student', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: {
      validate: {
        is : { args : /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ , msg : "Email format is incorrect"},
        isUnique : function (value,next) {
                      Student.findOne({
                        where: {
                          email: value,
                          id : {
                                 [Op.ne]: this.id
                               }
                        }
                      }).then (result => {
                        if (result !== null) {
                          return next("email already in use")
                        } else next ()
                        
                      }).catch (err => {
                        return next(`error message: ${err}`)
                      })
                    }
      },
      type: DataTypes.STRING,
    }
  }, {});
  Student.associate = function(models) {
    Student.belongsToMany(models.Subject, {through : models.StudentSubject})
    Student.hasMany(models.StudentSubject)
  };
  return Student;
};