const router = require ('express').Router();
const models = require('../models');

router.get('/', (req, res) => {
  models.Student.findAll({
    order: [
    ['id', 'ASC']
    ] 
  })
  .then( students => {
    res.render('students-data', {students: students})
  })
  .catch( err => {
    res.send(err.message)
  })
})

router.get('/add', (req, res) => {
  res.render('students-add', {errMsg: null})
})

router.post('/add', (req, res) => {
  let studentObj = {
    first_name : req.body.first_name,
    last_name : req.body.last_name,
    email : req.body.email
  }
  models.Student.create(studentObj)
  .then(()=> {
    res.redirect('/')
  })
  .catch(err => {
    res.render('students-add', {errMsg: err.message})
  })
})

router.get('/:id/add-subject', (req, res) => {
  models.Student.find({
    where: {id: req.params.id},
    include: [models.Subject],
    order: [
    ['id', 'ASC']
    ] 
  })
  .then( student => {
    models.Subject.findAll({
      order: [
      ['id', 'ASC']
      ] 
    })
  .then( subjects => {
    res.render('student-add-subject', {student: student, subjects: subjects})
    })
  })
  .catch( err => {
    res.send(err.message)
  })
})

router.post('/:id/add-subject', (req, res) => {
  let studentSubjectObj = {
    StudentId: req.params.id,
    SubjectId: req.body.subjectId
  }
  models.Studentsubject.create(studentSubjectObj)
  .then(() => {
    res.redirect('/')
  })
  .catch(err => {
    res.send(err.message)
  })
})


router.get('/edit/:id', (req, res) => {
  models.Student.findById(req.params.id)
  .then((student) => {
    res.render('student-edit', {student: student})
  })
  .catch(err => {
    res.send(err.message)
  })
})

router.post('/edit/:id', (req, res) => {
  let studentObj = {
    first_name : req.body.first_name,
    last_name : req.body.last_name,
    email : req.body.email
  }
  models.Student.update(studentObj, {
    where: {
      id: req.params.id
    },
    returning:true
  })
  .then(() => {
    res.redirect('/')
  })
  .catch(err => {
    res.send(err.message)
  })
})

router.get('/delete/:id', (req, res)=> {
  models.Student.destroy({
    where: {id:req.params.id}
  })
  .then(()=> {
    res.redirect('/')
  })
  .catch(err => {
    res.send(err.message)
  })
})


module.exports = router;