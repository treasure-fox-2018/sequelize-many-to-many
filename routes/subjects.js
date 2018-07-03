const express = require('express')
const router = express.Router()
const models = require ('../models')

router.get('/', (req, res) => {
  models.Subject.findAll({
    order: [["id", "ASC"]],
    include : [models.Teacher]
  })
  .then (dataSubjects => {
    res.render('./subjects/index', { dataSubjects : dataSubjects, error : null})
  })
  .catch(err => {
    res.render('./subjects/index', { dataSubjects: [], error : err})
  })
})

router.get('/add', (req, res) => {
  res.render('./subjects/add', {dataSubject : {} , error : null})
})

router.post('/add', (req, res) => {
  models.Subject.create ({
    subjectName : req.body.subjectName
  })
    .then(() => {
       res.redirect('/subjects')
    })
    .catch(err => {
      res.render('./subjects/add', {dataSubject : req.body , error : err.message})
    })
})

router.get('/edit/:id', (req, res) => {
  models.Subject.findById(req.params.id)
    .then(dataSubject => {
      res.render('./subjects/edit', {dataSubject : dataSubject , error : null})
    })
    .catch(err => {
      res.render('./subjects/edit', {dataSubject : [] , error : err.message})
    })
})

router.post('/edit/:id', (req, res) => {
  models.Subject.update(
    {
      subjectName : req.body.subjectName
    },
    {
      where: {
        id: req.params.id
      }
    }
  )
    .then(() => {
      res.redirect('/subjects')
    })
    .catch(err => {
      res.render('./subjects/edit', {dataSubject : req.body , error : err.message})
    })
})

router.get('/:id/enrolled-students', (req, res) => {
  models.Subject.findAll({
    include : [models.Student],
    where: {
      id : req.params.id
    }
  })
  .then(dataSubject => {
    res.render('./subjects/enrolled-students', {dataSubject : dataSubject , error : null})
  })
  .catch(err => {
    res.render('./subjects/enrolled-students', {dataSubject : [] , error : err.message})
  })
})

router.get('/:subjectId/give-score/:studentId', (req, res) => {
  models.Student.findAll({
    where : {
      id : req.params.studentId
    },
    include : [models.StudentSubject]
  })
  .then(dataStudent => {
    res.render('./subjects/give-score', {dataStudent : dataStudent , subjectId : req.params.subjectId, error : null})
  })
  .catch(err => {
    // res.send(err)
    res.render('./subjects/give-score', {dataStudent : [] , subjectId : null , error : err.message})
  })
})

router.post('/:subjectId/give-score/:studentId', (req, res) => {
  console.log(req.params.studentId)
  console.log(req.params.subjectId)
  console.log(res.body)
  models.StudentSubject.update({
      score : req.body.studentScore
    },
    {
      where: {
        StudentId : req.params.studentId,
        SubjectId : req.params.subjectId
      }
    })
  .then(dataStudent => {
    res.redirect(`/subjects/${req.params.subjectId}/enrolled-students`)
  })
  .catch(err => {
    res.send(err)
    // res.render('./subjects/enrolled-students', {dataStudent : [] , error : err.message})
  })
})


router.get('/delete/:id', (req, res) => {
  models.Subject.destroy({
    where: {
      id: req.params.id
    }
    })
    .then(deleteSubject => {
      res.redirect('/subjects')
    })
    .catch(err => {
      res.render('./subjects/index', { dataSubject: [], error : err.message})
    })
})


module.exports = router