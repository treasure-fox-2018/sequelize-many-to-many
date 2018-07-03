const routes = require('express').Router();
const models = require('../models');

routes.get('/', (req, res) =>{
  models.Teacher.findAll({
    order: [['id', 'ASC']],
    include: [models.Subject]
  })
  .then(function(teachers){
    // console.log(teachers);
    res.render("teacher",{title:'Teachers Data', links:'links:', teachers: teachers})
  })
})

routes.get('/add', (req, res) =>{
  res.render("teacher-add",{title:'Teacher Form', links:'links:',errMessage: null})
})

routes.post('/add', (req, res) =>{
  // console.log(req.body);
  models.Teacher.create({first_name: req.body.firstname, last_name: req.body.lastname, email: req.body.email, SubjectId: req.body.subject})
  .then(function(teacher){
    res.redirect('/teacher')
  })
  .catch(function(err){
    // console.log(req.body);
    let teacher = {firstname: req.body.firstname, lastname: req.body.lastname, email: req.body.email, SubjectId: req.body.subject}
    res.render("teacher-add",{title:'Teacher Form', links:'links:', errMessage: err.message, teacher: teacher})
  })
})

routes.get('/edit/:id', (req, res) =>{
  models.Teacher.findById(req.params.id)
  .then(function(teacher){
    // console.log(teacher);
    res.render("teacher-edit",{title:'Teacher Form', links:'links:', teacher: teacher})
  })
})

routes.post('/edit/:id', (req, res) =>{
  models.Teacher.update({id: req.params.id, first_name: req.body.firstname, last_name: req.body.lastname, email: req.body.email, SubjectId: req.body.subject},
    {where: {id: req.params.id}})
  .then(function(teacher){
    res.redirect('/teacher')
  })
})

routes.get('/delete/:id', (req, res) =>{
  models.Teacher.destroy({where:{id: req.params.id}})
  .then(function(teacher){
    res.redirect('/teacher')
  })
})

module.exports = routes
