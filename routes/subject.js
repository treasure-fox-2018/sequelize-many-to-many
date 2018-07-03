const subject = require('express').Router();
const models = require('../models');

subject.get('/', (request, response) => {
  models.Subject.findAll({
    order: [["id", "ASC"]],
    include: [models.Student, models.Teacher]
  })
    .then(subjectsData => {
      // response.send(subjectsData)
      response.render('./subject/home.ejs', { Subjects : subjectsData });
    })
})

subject.get('/:id/enrolled-students', (request, response) => {
  models.Subject.findAll(
    { 
      where: {
        id : request.params.id
      },
      include : [models.Student],
      order: [["id", "ASC"]], 
    })
      .then(subjectData => {
        response.render('./subject/enrolled-student.ejs', { Subjects : subjectData })
      })
})

subject.get('/:idSubject/enrolled-students/give-score/:idStudent', (request, response) => {
  models.Student.findOne({
    where : {
      id : request.params.idStudent
    }, include : [models.StudentSubject]
  })
    .then(dataSubject => {
      response.render('./subject/give-score.ejs', { subject : dataSubject, SubjectId : request.params.idSubject, StudentId: request.params.idStudent })
    })
  // response.send(request.params.idSubject)


})

subject.post('/:idSubject/enrolled-students/give-score/:idStudent', (request, response) => {
  models.StudentSubject.update({
    Score : request.body.score}, {
    where : {
      StudentId : request.params.idStudent,
      SubjectId : request.params.idSubject,
    }
  })
    .then(() => {
      response.redirect('/subject')
    })

})


module.exports = subject;