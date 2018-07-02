var express = require('express')
var router = express.Router()
let models = require('../models')
let Student = models.Student
let Subject = models.Subject
let Conj = models.StudentSubject

router.get('/students', function (req, res) {
  Student.findAll()
    .then(function (dataStudents) {
      res.render('students', {
        dataStudents
      })
    })
    .catch(function (err) {
      console.log(err)
    })
})


router.get('/students/delete/:id', function (req, res) {
  Student.destroy({
      where: {
        id: req.params.id
      }
    })
    .then(function () {
      res.redirect('/students')
    })
    .catch(function (err) {
      console.log(err)
    })
})

//add students
router.get('/students/add', function (req, res) {
  res.render('student-add')
})

router.post('/students/add', function (req, res) {
  Student.create(req.body)
    .then(function (data) {
      res.redirect('/students')

    })
    .catch(function (err) {
      console.log(err)
    })



})


//edit students
router.get('/students/edit/:id', function (req, res) {
  Student.findById(req.params.id)
    .then(function (student) {
      res.render('student-edit', {
        student
      })
    })
    .catch(function (err) {
      console.log(err)
    })
})



router.get('/students/:id/add-subject', function (req, res) {
  Student.findById(req.params.id)
    .then(function (dataStudent) {
      Subject.findAll()
        .then(function (subject) {
          res.render('addsubject', {
            dataStudent,
            subject
          })
        })
        .catch(function (err) {
          console.log(err)
        })
    })
    .catch(function (err) {
      console.log(err)
    })
})


router.post('/students/:id/add-subject', function (req, res) {
  Conj.create({
      SubjectId: req.body.SubjectId,
      StudentId: req.params.id

    })
    .then(() => {
      res.redirect('/students')
    })
    .catch(function (err) {
      console.log(err)
    })
})



module.exports = router
