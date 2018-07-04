'use strict';
module.exports = (sequelize, DataTypes) => {
  var Student = sequelize.define('Student', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isUnique: function(value, next){
          Student.find({where: {email: value}})
          .then(email => {
            if(email !== null && this.id == email.id){
              console.log(this.id)
              return next('email is already used here')
            } else {
              next()
            }
          })
        },
        isEmail: {
          args: true,
          msg: 'email is not valid'
        }}
      }
  }, {hooks: {
    beforeCreate: (subject,option) => {
      subject.createdAt = new Date();
      subject.updatedAt = new Date();
    }
  }});
  Student.associate = function(models) {
    Student.belongsToMany(models.Subject, {through: models.StudentSubject})
    Student.hasMany(models.StudentSubject)
  };
  return Student;
};