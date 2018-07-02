var express = require('express')
var router = express.Router()
let models = require('../models')
let Student = models.Student
let Subject = models.Subject
let Conj = models.StudentSubject


//show all subject and related data
router.get('/subjects', function (req, res) {
  Subject.findAll({
      include: {
        model: models.Teacher
      }
    })
    .then(function (subject) {
      res.render('subjects', {
        subject
      })
    })
    .catch(function (err) {
      console.log(err)
    })

})



//list of students with theirs score
router.get('/subjects/:id/enrolled-students', function (req, res) {
  Conj.findAll({
      include: ['Student', 'Subject'],
      where: {
        SubjectId: req.params.id
      }
    })
    .then(function (x) {
      res.render('enrolled-student', {
        x
      })
    })
    .catch(function (err) {
      res.send(err)
      console.log(err)
    })


})


//assign score to each student if score is NULL /empty
router.get('/subjects/:id/give-score/:sid', function (req, res) {
  Conj.findAll({
      include: ['Student', 'Subject'],
      where: {
        StudentId: req.params.id,
        SubjectId: req.params.sid

      }
    })
    .then(function (x) {
      res.render('give-score', {
        x
      })
    })
    .catch(function (err) {
      res.send(err)
      console.log(err)
    })
})



//post to assign score
router.post('/subjects/:id/give-score/:sid', function (req, res) {
  Conj.update({
      StudentId: req.params.id,
      SubjectId: req.params.sid,
      score: req.body.score
    }, {
      where: {
        StudentId: req.params.id,
        SubjectId: req.params.sid,
      }
    })
    .then(function () {
      res.redirect('/subjects')
    })
})


module.exports = router
