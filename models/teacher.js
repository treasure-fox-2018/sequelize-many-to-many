'use strict';
module.exports = (sequelize, DataTypes) => {
  const Op = sequelize.Op
  var Teacher = sequelize.define('Teacher', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: {
      validate: {
        is : { args : /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ , msg : "Email format is incorrect"},
        isUnique : function (value,next) {
                      Teacher.findOne({
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
  Teacher.associate = function(models) {
    Teacher.belongsTo(models.Subject)
  };
  return Teacher;
};