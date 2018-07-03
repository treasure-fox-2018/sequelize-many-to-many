const routes = require('express').Router();
const models = require('../models');

routes.get('/', (req, res) =>{
  models.Student.findAll()
  .then(function(students){
    res.render("student",{title:'Students Data', links:'links:', students: students})
  })
})

routes.get('/add', (req, res) =>{
  res.render("student-add",{title:'Student Form', links:'links:',errMessage: null})
})

routes.post('/add', (req, res) =>{
  // console.log(req.body);
  models.Student.create({first_name: req.body.firstname, last_name: req.body.lastname, email: req.body.email})
  .then(function(student){
    res.redirect('/student')
  })
  .catch(function(err){
    // console.log(req.body);
    let student = {firstname: req.body.firstname, lastname: req.body.lastname, email: req.body.email}
    res.render("student-add",{title:'Student Form', links:'links:', errMessage: err.message, student: student})
  })
})

routes.get('/edit/:id', (req, res) =>{
  models.Student.findById(req.params.id)
  .then(function(student){
    // console.log(student);
    res.render("student-edit",{title:'Student Form', links:'links:', student: student,errMessage: null})
  })
})

routes.post('/edit/:id', (req, res) =>{
  models.Student.update({id: req.params.id, first_name: req.body.firstname, last_name: req.body.lastname, email: req.body.email},
    {where: {id: req.params.id}})
  .then(function(student){
    res.redirect('/student')
  })
  .catch(function(err){
    // console.log(req.body);
    // console.log(req.params.id);
    let student = {id: req.params.id, firstname: req.body.firstname, lastname: req.body.lastname, email: req.body.email}
    res.render("student-edit",{title:'Student Form', links:'links:', errMessage: err.message, student: student})
  })
})

routes.get('/delete/:id', (req, res) =>{
  models.Student.destroy({where:{id: req.params.id}})
  .then(function(student){
    res.redirect('/student')
  })
})

routes.get('/:id/add-subject', (req,res)=>{
  models.Student.find({
    where:{id: req.params.id}
  })
  .then(function(student){
    // console.log(student);
    models.Subject.findAll()
    .then(function(subjects){
      // console.log(subjects);
      res.render("student-add-subject",{title:'Add Subject to Student', links:'links:', student: student, subjects: subjects,errMessage: null})
    })
  })
})

routes.post('/:id/add-subject', (req, res)=>{
  // res.send(req.body)
  // console.log(req.body);
  console.log(req.body.SubjectId);
  console.log(req.params.id);
  models.StudentSubject.create({StudentId: req.params.id, SubjectId: req.body.SubjectId})
  .then(function(){
    res.redirect('/student')
  })
})

module.exports = routes
