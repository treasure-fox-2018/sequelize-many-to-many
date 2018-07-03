const student = require('express').Router();
const models = require('../models');

student.get('/', (request, response) => {
  models.Student.findAll({
    order: [["id", "ASC"]],
    include: [models.Subject]
  })
    .then(studentsData => {
      // response.send(studentsData)
      response.render('./student/home.ejs', { dataStudents: studentsData })
    })
})

student.get('/:id/add-subject', (request, response) => {
  models.Student.findById(request.params.id)
    .then(student => {
      models.Subject.findAll()
        .then(subjects => {
          response.render('./student/add-subject.ejs', { dataStudent: student, dataSubjects: subjects });
        })
    })
})

student.post('/:id/add-subject', (request, response) => {
  models.StudentSubject.create({
    StudentId: request.params.id,
    SubjectId: request.body.subject_id
  })
    .then(() => {
      response.redirect('/')
    })

})

module.exports = student