const router = require('express').Router()
const models = require('../models')
const Student = models.Student
const Subject = models.Subject
const SubjectStudent = models.SubjectStudent

router.get('/', (req, res) => {
  Student.findAll({
    order: [
      ['id', 'ASC']
    ]})
    .then(students => {
      res.render('tableView', {
        category: 'student',
        data: students,
        err: null
      })
    })
    .catch(err => res.send(err.message))
})

router.get('/add', (req, res) => {
  let data = { first_name: '', last_name: '', email: ''}
  res.render('addView', {
    category: 'student',
    err: null,
    data: data
  })
})

router.post('/add', (req, res) => {
  let input = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email
  }
  Student.create(input)
    .then(() => res.redirect('/students'))
    .catch(error => {
      res.render('addView', {
        category: 'student',
        err: error.message,
        data: input
      })
    })
})

router.get('/edit/:id', (req, res) => {
  Student.findById(req.params.id)
    .then(student => {
      // res.send(student.toJSON())
      res.render('editView', {
        category: 'student',
        data: student,
        err: null
      })
    })
    .catch(err => res.send(err.message))
})

router.post('/edit/:id', (req, res) => {
  let data = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email
  }

  Student.update(data, {
    where: { id: req.params.id }
  }).then(() => res.redirect('/students'))
    .catch(error => {
      res.render('editView', {
        category: 'student',
        data: data,
        err: error.message
      })
    })
})

router.get('/delete/:id', (req, res) => {
  Student.findById(req.params.id)
    .then(student => {
      res.render('deleteView', {
        category: 'student',
        data: student,
        err: null
      })
    })
    .catch(err => res.send(err.message))
})

router.post('/delete/:id', (req, res) => {
  Student.destroy({
    where: { id: req.params.id }
  })
    .then(() => res.redirect('/students'))
    .catch((err) => res.send(err.message))
})

router.get('/:id/add-subject', (req, res) => {
  Student.findById(req.params.id)
    .then(student => {
      Subject.findAll()
        .then(subjects => {
          res.render('addStudentSubject', {
            student,
            subjects,
            error: null
          })
        })
    })
    .catch(err => res.send(err))
})

router.post('/:id/add-subject', (req, res) => {
  let value = req.body.subjectValue
  Student.findById(req.params.id)
    .then(student => {
      return SubjectStudent.create({
        StudentId: student.id,
        SubjectId: +value
      })
    })
    .then(() => res.redirect('/students'))
    .catch(err => res.json(err))
})

module.exports = router