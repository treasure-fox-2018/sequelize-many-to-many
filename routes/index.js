'use strict'

const routes = require('express').Router()
const ejs = require('ejs')
const path = require('path')

const model = require('../models/')
const Student = model.Student
const Subject = model.Subject
const SubjectStudent = model.SubjectStudent

routes.get('/', (req, res) => {
    res.render('homepage')
})

routes.get('/student', (req, res) => {
    Student.findAll()
    .then(students => {
        res.render('student', {students: students})
    })
    .catch(err => console.log(err))
})


routes.get('/student/add', (req, res) => {
    Subject.findAll()
    .then(subjects => {
        let msgerror = ''
        res.render('student-add', {subjects: subjects, msgerror: msgerror})
    })
    .catch(err => console.log(err))
})

routes.post('/student/add', (req, res) => {
    let studentFirstname = req.body.firstName
    let studentLastname = req.body.lastName
    let studentEmail = req.body.email


    Subject.findOne({where: {subjectName: req.body.subjectChoose}})
    .then(subjectChoosen => {
            Subject.findAll()
            .then(subjects => {
                Student.findAll({where: {email: studentEmail}})
                .then(emailExists => {
                    if (emailExists.length >= 1) {
                        let msgerror = 'Email already Exist'
                        res.render('student-add', {subjects: subjects, msgerror:msgerror})
                    } else {
                        Student.create({
                            firstName: studentFirstname,
                            lastName: studentLastname,
                            email: studentEmail
                        })
                        .then(() => {
                            res.redirect('/student')
                          }
                        )
                        .catch(err => {
                              let msgerror = err
                              res.render('student-add', {subjects:subjects, msgerror: msgerror})
                            }
                        )
                    }
                })
            })
        }
    )
    .catch(err => console.log(err))
})

routes.get('/student/:id/add-subject', (req, res) => {
    Student.findById(req.params.id)
    .then(student => {
        Subject.findAll()
        .then(subjects => {
            res.render('assignSubject', {student:student, subjects: subjects})
        })
    })
})

routes.post('/student/:id/add-subject', (req, res) => {
    console.log(req.body.subjectChoose)

    Subject.findOne({where: {subjectName: req.body.subjectChoose}})
    .then(subject => {
        SubjectStudent.findAll({
            where: {
                StudentId: req.params.id,
                SubjectId: subject.id
            }
        })
        .then(findDuplicate => {
            if (findDuplicate.length > 0) {
                console.log('warning duplicate');
            } else {
                SubjectStudent.create({
                    StudentId: req.params.id,
                    SubjectId: subject.id})
                .then(() =>
                  res.redirect('/student'))
            }
        })
        .catch(err => {
            console.log('------ ini error dari catch find all where cause');
            console.log(err)}
        )
    })
})

routes.get('/subject', (req, res) => {
    Subject.findAll()
    .then(subjects => {
        res.render('subject', {subjects: subjects})
    })
})

routes.get('/subject/:subjectId/enrolled-students', (req, res) => {
    SubjectStudent.findAll(
        {include: [Student], where: {SubjectId: req.params.subjectId}})
    .then(StudentsBySubject => {
        // res.send(StudentsBySubject)
        console.log(JSON.stringify(StudentsBySubject))
        res.render('enrolled-student', {students: StudentsBySubject})
    })
    .catch(err => console.log(err))
})

routes.get('/subject/:StudentId/give-score', (req, res) => {
  let msgerror = ''
  Student.findById(req.params.StudentId)
  .then(student => {
      res.render('student-give-score', {student:student, msgerror:msgerror})
  })
})

routes.post('/subject/:StudentId/give-score', (req, res) => {
    let studentScore = req.body.score

    if (studentScore > 100 || studentScore < 0) {
        let msgerror = 'Score not valid!'
        Student.findById(req.params.StudentId)
        .then(student => {
            res.render('student-give-score', {student:student, msgerror:msgerror})
        })
    } else {
        SubjectStudent.update(
          {
            score: studentScore
          },
          {
            where: {
              id: req.params.StudentId
            }
          })
        .then( () => {
            res.redirect('/subject')
        })
        .catch(err => {
            console.log(err)
        })
    }
})

module.exports = routes

























//
