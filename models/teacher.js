'use strict';
module.exports = (sequelize, DataTypes) => {
  const Op = sequelize.Op;
  var Teacher = sequelize.define('Teacher', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      validate: {
        is: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        isUnique: function(value, next) {
          Teacher.findOne({
            where: {
              email: value, 
              id: {
                [Op.ne]: this.id
              }
            }
          })
          .then(value => {
            if(value !== null) {
              return next('Email already exist!')
            } else {
              return next()
            }
          })
          .catch(err => {
            return next(err)
          })
        }
      },
    },
    SubjectId : DataTypes.INTEGER,
  }, 
  {
    hooks: {
    beforeCreate: (teacher, options) => {
      if (teacher.lastName == '') {
        teacher.lastName = 'NONE'
      }
    }
  }
});
  Teacher.associate = function(models) {
    // associations can be defined here
    Teacher.belongsTo(models.Subject)
  };
  return Teacher;
};