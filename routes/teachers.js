const router = require('express').Router()
const models = require('../models')
const Teacher = models.Teacher
const Subject = models.Subject

router.get('/', (req, res) => {
  Teacher.findAll({
    include: Subject,
    order: [
      ['id', 'ASC']
    ]})
    .then(teachers => {
      res.render('tableView', {
        category: 'teacher',
        data: teachers,
        err: null
      })
      // res.json(teachers)
    })
    .catch(err => res.send(err.message))
})

router.get('/add', (req, res) => {
  let data = { first_name: '', last_name: '', email: ''}
  res.render('addView', {
    category: 'teacher',
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
  Teacher.create(input)
    .then(() => res.redirect('/teachers'))
    .catch(error => {
      res.render('addView', {
        category: 'teacher',
        err: error.message,
        data: input
      })
    })
})

router.get('/edit/:id', (req, res) => {
  Teacher.findById(req.params.id)
    .then(teacher => {
      res.render('editView', {
        category: 'teacher',
        data: teacher,
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

  Teacher.update(data, {
    where: { id: req.params.id }
  }).then(() => res.redirect('/teachers'))
    .catch(error => {
      res.render('editView', {
        category: 'teacher',
        data: data,
        err: error.message
      })
    })
})

router.get('/delete/:id', (req, res) => {
  Teacher.findById(req.params.id)
    .then(teacher => {
      res.render('deleteView', {
        category: 'teacher',
        data: teacher,
        err: null
      })
    })
    .catch(err => res.send(err.message))
})

router.post('/delete/:id', (req, res) => {
  Teacher.destroy({
    where: { id: req.params.id }
  })
    .then(() => res.redirect('/teachers'))
    .catch((err) => res.send(err.message))
})

module.exports = router