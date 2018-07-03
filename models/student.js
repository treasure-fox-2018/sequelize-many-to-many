'use strict';
module.exports = (sequelize, DataTypes) => {
  const Op = sequelize.Op;
  var Student = sequelize.define('Student', {
    first_name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true,
      },
    },
    last_name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true,
      },
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true,
        is: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        isUnique: function(value, callback) {
          // console.log("test");
          Student.findOne({
              where: {
                email: value,
                id: {[Op.ne]: this.id}
              }
            }).then(function(u) {
              if (u !== null) {
                callback('Email address already in use!')
              } else {
                callback();
              }
            })
            .catch(failed => {
              callback(failed)
            })
        }
      },
    },
    createdAt: new Date(),
    updatedAt: new Date(),
  }, {});
  Student.associate = function(models) {
    Student.belongsToMany(models.Subject, {through: "StudentSubject"});
  };
  return Student;
};
