const router = require ('express').Router();
const models = require('../models');

router.get('/', (req, res) => {
  models.Subject.findAll({
    include: [models.Teacher],
    order: [
    ['id', 'ASC']
    ] 
  })
  .then( subjects => {
    console.log(subjects)
    res.render('subjects-data', {subjects: subjects})
  })
  .catch( err => {
    res.send(err.message)
  })
})

router.get('/add', (req, res) => {
  res.render('subjects-add')
})

router.post('/add', (req, res) => {
  let subjectObj = {
    subject_name : req.body.subject_name,
  }
  models.Subject.create(subjectObj)
  .then(()=> {
    res.redirect('/')
  })
  .catch(err => {
    res.send(err.message)
  })
})

router.get('/edit/:id', (req, res) => {
  models.Subject.findById(req.params.id)
  .then((subject) => {
    res.render('subject-edit', {subject: subject})
  })
  .catch(err => {
    res.send(err.message)
  })
})

router.post('/edit/:id', (req, res) => {
  let subjectObj = {
    subject_name : req.body.subject_name
  }
  models.Subject.update(subjectObj, {
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
  models.Subject.destroy({
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