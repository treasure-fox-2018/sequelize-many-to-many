const router = require ('express').Router();
const models = require('../models');

router.get('/', (req, res) => {
  models.Teacher.findAll({
    include: [models.Subject],
    order: [
    ['id', 'ASC']
    ] 
  })
  .then( teachers => {
    res.render('teachers-data', {teachers: teachers})
  })
  .catch( err => {
    res.send(err.message)
  })
})

router.get('/add', (req, res) => {
  res.render('teachers-add', {errMsg: null})
})

router.post('/add', (req, res) => {
  let teacherObj = {
    first_name : req.body.first_name,
    last_name : req.body.last_name,
    email : req.body.email
  }
  models.Teacher.create(teacherObj)
  .then(()=> {
    res.redirect('/')
  })
  .catch(err => {
    res.render('teachers-add', {errMsg: err.message})
  })
})

router.get('/edit/:id', (req, res) => {
  models.Teacher.findById(req.params.id)
  .then((teacher) => {
    res.render('teacher-edit', {teacher: teacher})
  })
  .catch(err => {
    res.send(err.message)
  })
})

router.post('/edit/:id', (req, res) => {
  let teacherObj = {
    first_name : req.body.first_name,
    last_name : req.body.last_name,
    email : req.body.email
  }
  models.Teacher.update(teacherObj, {
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
  models.Teacher.destroy({
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