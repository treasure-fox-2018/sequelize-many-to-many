'use strict';
module.exports = (sequelize, DataTypes) => {
  const Op = sequelize.Op;
  var Teacher = sequelize.define('Teacher', {
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
    email: {type:DataTypes.STRING,
      validate:{isEmail:true,
      unique: function(value,next) {
        Teacher.find({
          where: {email: value,
            id: {[Op.ne]: this.id}},
        })
        .then(user=>{
          if (user !== null) {
            return next('email is already used')
          }else {
            next()
          }
        })
        .catch(err=>{
          return next('error')
        })
      }},
    },
  }, {});
  Teacher.associate = function(models) {
    // associations can be defined here
    Teacher.belongsTo(models.Subject)
  };
  return Teacher;
};
