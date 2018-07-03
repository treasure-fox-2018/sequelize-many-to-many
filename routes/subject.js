const routes = require('express').Router()
const models = require('../models')
const Students = models.Student
const Subjects = models.Subject
const StudentSubjects =  models.StudentSubject

routes.get('/', (req, res) => {
  Subjects.findAll({
    include: [models.Student]
  })  
    .then(dataSubject => {
      // res.send(dataSubject)
      res.render('data_subject', {dataSubject: dataSubject})
    })
})

routes.get('/:id/enrolled-students',(req, res) => {
  // res.send('enrolled student')
  Subjects.findAll({
    include: [models.Student],
    where: {
      id: req.params.id
    }
  })
  .then(dataSubjectOfStudent => {
    // res.send(dataSubjectOfStudent);
    res.render('enroll_student', {
      title_subject: dataSubjectOfStudent[0].subject_name,
      studentBySubject: dataSubjectOfStudent[0].Students,
      score: dataSubjectOfStudent[0].Students.StudentSubject 
    })
    //res.send(dataSubjectOfStudent[0].Students)
  })
})

routes.get('/:id/give-score',(req, res) => {
  // res.send('give score')
  Students.findOne({
    where: {
      id: req.params.id
    }
  })
  .then(student => {
    res.render('give_score', {student: student})
    // res.send(student)
  })
})

routes.post('/:id/give-score', (req, res) => {
  //const scores = req.body.score
  StudentSubjects.findOne({
    where: {
      StudentId: req.params.id
    }
  })
  .then(scoreStudent => {
    // // res.render('')
    // res.send(scoreStudent)
    StudentSubjects.update({
      score: req.body.score
    }, 
    {
      where: {
        id: req.params.id
      }
    })
  })
})




module.exports = routes