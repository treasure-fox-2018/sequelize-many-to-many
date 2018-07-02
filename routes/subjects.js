var express = require('express')
var router = express.Router()
let models = require('../models')
let Student = models.Student
let Subject = models.Subject
let Conj = models.StudentSubject





router.get('/subjects', function (req, res) {
  Subject.findAll({
      include: {
        model: models.Teacher
      }
    })
    .then(function (subject) {
      //  res.send(subject)
      res.render('subjects', {
        subject
      })
    })
    .catch(function (err) {
      console.log(err)
    })

})



router.get('/subjects/:id/enrolled-students', function (req, res) {

  Subject.findById(req.params.id, {
      include: [
        {
          model: models.Student

        }
  ]
    })
    .then(function (subject) {
      // res.render('enrolled-student', {
      //   subject
      // })
      res.send(subject)

    })

  // res.render('enrolled-student')







})


module.exports = router
