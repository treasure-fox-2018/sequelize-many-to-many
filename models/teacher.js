'use strict';
module.exports = (sequelize, DataTypes) => {
  var Teacher = sequelize.define('Teacher', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: {
      type:DataTypes.STRING,
      validate: {
        isEmail: true,
        is: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        isUnique: function(value, callback) {
          // console.log("test");
          Teacher.findOne({
              where: {
                email: value
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
    SubjectId: DataTypes.INTEGER,
  }, {});
  Teacher.associate = function(models) {
    Teacher.belongsTo(models.Subject)
  };
  return Teacher;
};
