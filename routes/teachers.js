const express = require('express')
const router = express.Router()
const models = require ('../models')


router.get('/', (req, res) => {
  models.Teacher.findAll({
    order: [["id", "ASC"]],
    include : [models.Subject]
  })
  .then (dataTeachers => {
    res.render('./teachers/index', { dataTeachers : dataTeachers, error : null})
  })
  .catch(err => {
    res.render('./teachers/index', { dataTeachers: [], error : err.message})
  })
})


router.get('/add', (req, res) => {
  models.Subject.findAll({
    order : [["id","ASC"]]
  })
  .then (dataSubjects => {
    res.render('./teachers/add', {dataTeacher : {} , dataSubjects : dataSubjects, error : null})
  }).catch (err => {
    res.render('./teachers/add', {dataTeacher : {} , dataSubjects : {}, error : err})
  })
})

router.post('/add', (req, res) => {
  models.Teacher.create ({
    firstName : req.body.firstName,
    lastName : req.body.lastName,
    email : req.body.email,
    SubjectId : req.body.SubjectId
  })
    .then(() => {
       res.redirect('/teachers')
    })
    .catch(errTeacher => {
      models.Subject.findAll({
        order : [["id","ASC"]]
      })
        .then (dataSubjects => {
          res.render('./teachers/add', {dataTeacher : req.body , dataSubjects : dataSubjects, error : errTeacher.message})
        })
        .catch (errSubject => {
          res.render('./teachers/add', {dataTeacher : req.body , dataSubjects : [], error : errSubject})
      })
    })
})

router.get('/edit/:id', (req, res) => {
  models.Teacher.findById(req.params.id)
    .then(dataTeacher => {
      models.Subject.findAll({
          order : [["id","ASC"]]
        })
          .then (dataSubjects => {
            res.render('./teachers/edit', {dataTeacher : dataTeacher , dataSubjects : dataSubjects, error : null})
        })
          .catch (errSubject => {
            res.render('./teachers/edit', {dataTeacher : dataTeacher , dataSubjects : [], error : errSubject.message })
          })
      })
    .catch(errTeacher => {
      res.render('./teachers/edit', {dataTeacher : [] , dataSubjects : [] , error : errTeacher.message})
    })
})

router.post('/edit/:id', (req, res) => {
  models.Teacher.update(
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
      res.redirect('/teachers')
    })
    .catch(err => {
       models.Subject.findAll({
          order : [["id","ASC"]]
        })
          .then (dataSubjects => {
            res.render('./teachers/edit', {dataTeacher : req.body , dataSubjects : dataSubjects, error : err})
        })
          .catch (errSubject => {
            res.render('./teachers/edit', {dataTeacher : req.body , dataSubjects : [], error : errSubject.message })
          })
    })
})

router.get('/delete/:id', (req, res) => {
  models.Teacher.destroy({
    where: {
      id: req.params.id
    }
    })
    .then(deleteTeacher => {
      res.redirect('/teachers')
    })
    .catch(err => {
      res.render('./teachers/index', { dataTeachers: [], error : err.message})
    })
})  


module.exports = router