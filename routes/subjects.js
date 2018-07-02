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



router.get('/subjects/:id/give-score/:sid', function (req, res) {
  Conj.findAll({
      include: ['Student', 'Subject'],
      where: {
        StudentId: req.params.id,
        SubjectId: req.params.sid

      }
    })
    .then(function (x) {
      //  res.send(x)
      res.render('give-score', {
        x
      })
    })
    .catch(function (err) {
      res.send(err)
      console.log(err)
    })
})




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


//
// Subject.findById(req.params.id, {
//     include: [
//       {
//         model: models.Student
//
//       }
// ]
//   })
//   .then(function (subject) {
//     //  res.send(JSON.stringify(subject.Students.id))
//     Conj.findAll()
//       .then(function (conj) {
//
//
//
//       })
//
//
//
//
//
//     res.render('enrolled-student', {
//       subject
//     })
//
//
//   })


// })


module.exports = router
