const express = require('express')
const router = express.Router()
const models = require ('../models')

router.get('/', (req, res) => {
  models.Student.findAll({
    order: [["id", "ASC"]]
  })
  .then (dataStudents => {
    res.render('./students/index', { dataStudents : dataStudents, error : null})
  })
  .catch(err => {
    res.render('./students/index', { dataStudents: [], error : err.message})
  })
})

router.get('/add', (req, res) => {
  res.render('./students/add', {dataStudent : {} , error : null})
})

router.post('/add', (req, res) => {
  models.Student.create ({
    firstName : req.body.firstName,
    lastName : req.body.lastName,
    email : req.body.email
  })
    .then(() => {
       res.redirect('/students')
    })
    .catch(err => {
      res.render('./students/add', {dataStudent : req.body , error : err.message})
    })
})

router.get('/edit/:id', (req, res) => {
  models.Student.findById(req.params.id)
    .then(dataStudent => {
      res.render('./students/edit', {dataStudent : dataStudent , error : null})
    })
    .catch(err => {
      res.render('./students/edit', {dataStudent : [] , error : err.message})
    })
})

router.post('/edit/:id', (req, res) => {
  models.Student.update(
    {
      id : req.params.id,
      firstName : req.body.firstName,
      lastName : req.body.lastName,
      email : req.body.email,
      SubjectId : req.body.SubjectId
    },
    {
      where: {
        id: req.params.id
      }
    }
  )
    .then(() => {
      res.redirect('/students')
    })
    .catch(err => {
      res.render('./students/edit', {dataStudent : req.body , error : err.message})
    })
})

router.get('/delete/:id', (req, res) => {
  models.Student.destroy({
    where: {
      id: req.params.id
    }
    })
    .then(deleteStudent => {
      res.redirect('/students')
    })
    .catch(err => {
      res.render('./students/index', { dataStudents: [], error : err.message})
    })
})  

router.get('/:id/add-subject', (req, res) => {
  models.Student.findById(req.params.id)
    .then(dataStudent => {
      models.Subject.findAll({
        order: [["id", "ASC"]]
      })
      .then(dataSubject => {
        res.render('./students/add-subject', {dataStudent : dataStudent , error : null, dataSubject : dataSubject})
      })
      .catch(err => {
        res.render('./students/add-subject', {dataStudent : [] , error : err.message , dataSubject : []})
      })
    })
    .catch(err => {
      res.render('./students/add-subject', {dataStudent : [] , error : err.message, dataSubject : []})
    })
})

router.post('/:id/add-subject', (req, res) => {
  models.StudentSubject.create(
    {
      StudentId : req.params.id,
      SubjectId : req.body.subjectId
    }
  )
    .then(() => {
      res.redirect('/students')
    })
    .catch(err => {
      res.render('./students/add-subject', {dataStudent : [] , error : err.message, dataSubject : []})
    })
})

module.exports = router