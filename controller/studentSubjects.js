const models = require('../models');
const Sequelize = require('Sequelize');
const Op = Sequelize.Op;

class studentSubjectsController {

  static addRelationship(StudentId, SubjectId) {
    return models.StudentSubject.create({
      StudentId: StudentId,
      SubjectId: SubjectId,
    });
  }

  static addScore(scoreValue, studentId, subjectId) {
    return models.StudentSubject.update({
      score: scoreValue
    }, {
      where: {
        [Op.and]: [{
            StudentId: studentId,
          },
          {
            SubjectId: subjectId,
          },
        ]
      }
    })
  };


  static showAllData() {
    return models.StudentSubject.findAll();
  }
  //
  // static editStudent(id, StudentId, SubjectId, email) {
  //   return (
  //     models.Student.findById(Number(id), {
  //       raw: true
  //     }).then((data) => {
  //       // console.log([first_name, SubjectId, email]);
  //       if (first_name === '') {
  //         var processed_first_name = data.first_name;
  //       } else {
  //         var processed_first_name = first_name
  //       }
  //       if (SubjectId === '') {
  //         var processed_SubjectId = data.SubjectId;
  //       } else {
  //         var processed_SubjectId = SubjectId
  //       }
  //       if (email === '') {
  //         var processed_email = data.email;
  //       } else {
  //         var processed_email = email
  //       }
  //       console.log(data);
  //       console.log([processed_first_name, processed_SubjectId, processed_email]);
  //       models.Student.update({
  //         first_name: processed_first_name,
  //         SubjectId: processed_SubjectId,
  //         email: processed_email,
  //       }, {
  //         where: {
  //           id: `${id}`
  //         }
  //       })
  //     })
  //   )
  // }

}

module.exports = studentSubjectsController;
