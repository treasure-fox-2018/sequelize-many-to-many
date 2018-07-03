'use strict';
module.exports = (sequelize, DataTypes) => {
  var SubjectStudent = sequelize.define('SubjectStudent', {
    StudentId: DataTypes.INTEGER,
    SubjectId: DataTypes.STRING
  }, {});
  SubjectStudent.associate = function(models) {
      SubjectStudent.belongsTo(models.Student)
      SubjectStudent.belongsTo(models.Subject)
  };
  return SubjectStudent;
};


//
// routes.post('/teacher/add', (req, res) => {
//     let teacherFirstname = req.body.firstName
//     let teacherLastname = req.body.lastName
//     let teacherEmailArgs = req.body.email
//
//     Subject.findOne({where: {subjectName: req.body.subjectChoose}})
//     .then(subject => {
//         Teacher.findAll({
//                 where: {
//                   email: teacherEmailArgs}
//             })
//             .then(emailExists => {
//                 if (emailExists.length >= 1) {
//                     console.log('Email sudah ada!')
//                     res.redirect('/teacher')
//                 } else {
//                   Teacher.create({
//                       firstName: teacherFirstname,
//                       lastName: teacherLastname,
//                       email: teacherEmailArgs,
//                       SubjectId: subject.id,
//                   })
//                   .then(() => {
//                       res.redirect('/teacher')
//                   })
//                   .catch(err => {
//                       console.log(err)
//                   })
//                 }
//             })
//             .catch(err => console.log(err))
//     })
// })
