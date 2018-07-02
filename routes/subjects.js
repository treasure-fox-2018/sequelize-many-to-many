const router = require('express').Router()
const models = require('../models')
const Student = models.Student
const Subject = models.Subject
const Teacher = models.Teacher
const SubjectStudent = models.SubjectStudent

router.get('/', (req, res) => {
  Subject.findAll({
    include: Teacher,
    order: [
      ['id', 'ASC']
    ]})
    .then(subjects => {
      res.render('tableView', {
        category: 'subject',
        data: subjects,
        err: null
      })
      // res.json(subjects)
    })
    .catch(err => res.send(err.message))
})

router.get('/add', (req, res) => {
  let data = { subject_name: '' }
  res.render('addView', {
    category: 'subject',
    err: null,
    data: data
  })
})

router.post('/add', (req, res) => {
  let input = {
    subject_name: req.body.subject_name,
  }
  Subject.create(input)
    .then(() => res.redirect('/subjects'))
    .catch(error => {
      res.render('addView', {
        category: 'subject',
        err: error.message,
        data: input
      })
    })
})

router.get('/edit/:id', (req, res) => {
  Subject.findById(req.params.id)
    .then(subject => {
      res.render('editView', {
        category: 'subject',
        data: subject,
        err: null
      })
    })
    .catch(err => res.send(err.message))
})

router.post('/edit/:id', (req, res) => {
  let data = {
    subject_name: req.body.subject_name
  }

  Subject.update(data, {
    where: { id: req.params.id }
  })
    .then(() => res.redirect('/subjects'))
    .catch(error => {
      res.render('editView', {
        category: 'subject',
        data: data,
        err: error.message
      })
    })
})

router.get('/delete/:id', (req, res) => {
  Subject.findById(req.params.id)
    .then(subject => {
      res.render('deleteView', {
        category: 'subject',
        data: subject,
        err: null
      })
    })
    .catch(err => res.send(err.message))
})

router.post('/delete/:id', (req, res) => {
  Subject.destroy({
    where: { id: req.params.id }
  })
    .then(() => res.redirect('/subjects'))
    .catch((err) => res.send(err.message))
})

router.get('/:id/enrolled-students', (req, res) => {
  SubjectStudent.findAll({
    attributes: [ 
      'id', // such a bug hmm
      'StudentId', 
      'SubjectId',
      'score', 
      'createdAt', 
      'updatedAt' ],
    include: [Student, Subject],
    where: { SubjectId: req.params.id }
  })
  .then(enrolled => {
    // res.json(enrolled)
    res.render('enrolledStudents', {
      data: enrolled
    })
  })
  .catch(err => res.send(err))
})

router.get('/:id/give-score', (req, res) => {
  SubjectStudent.findOne({
    attributes: [ 
      'id', // such a bug hmm
      'StudentId', 
      'SubjectId',
      'score', 
      'createdAt', 
      'updatedAt' ],
    include: [Student, Subject],
    where: { id: req.params.id }
  })
  .then(instance => {
    res.render('giveScore', {
      data: instance,
      error: null
    })
  })
  .catch(err => res.send(err))
})

router.post('/:id/give-score', (req, res) => {
  SubjectStudent.update({ score: req.body.score }, {
    where: { id: req.params.id }
  })
  .then(() => res.redirect(`/subjects`))
  .catch(err => res.send(err))
})

module.exports = router