const routes = require('express').Router();
const models = require('../models');

routes.get('/', (req, res) =>{
  models.Subject.findAll({
    order: [['id', 'ASC']],
    include: [models.Teacher]
  })
  .then(function(subjects){
    res.render("subject",{title:'Subjects Data', links:'links:', subjects: subjects})
  })
})

routes.get('/add', (req, res) =>{
  res.render("subject-add",{title:'Subject Form', links:'links:'})
})

routes.post('/', (req, res) =>{
  // console.log(req.body);
  models.Subject.create({name: req.body.subjectname})
  .then(function(subject){
    res.redirect('/subject')
  })
})

routes.get('/edit/:id', (req, res) =>{
  models.Subject.findById(req.params.id)
  .then(function(subject){
    // console.log(subject);
    res.render("subject-edit",{title:'Subject Form', links:'links:', subject: subject})
  })
})

routes.post('/edit/:id', (req, res) =>{
  models.Subject.update({name: req.body.subjectname},
    {where: {id: req.params.id}})
  .then(function(subject){
    res.redirect('/subject')
  })
})

routes.get('/delete/:id', (req, res) =>{
  models.Subject.destroy({where:{id: req.params.id}})
  .then(function(subject){
    res.redirect('/subject')
  })
})

routes.get('/:id/enrolled-students', (req, res) =>{
  models.Subject.findAll({
    where:{id: req.params.id},
    include: [models.Student]
  })
  .then(function(subject){
    // res.send(subject[0].Students[0].id)
    // console.log(subject[0].Students[0].id)
    res.render("subject-enrolled-students",{title:subject[0].name, links:'links:', subject: subject[0]})
  })
})

routes.get('/:id/give-score', (req, res)=>{
  models.StudentSubject.findAll({
    where:{SubjectId: req.params.id},
    include: [models.Student]
  })
  .then(function(studentSubjects){
    // res.send(studentSubjects)
    res.render("subject-give-score",{title:'Give Score', links:'links:', studentSubjects: studentSubjects, subjectId: req.params.id})
  })
})

routes.post('/:subjectId/give-score/:studentId', (req, res)=>{
  models.StudentSubject.update({score: req.body.score},{where: {StudentId: req.params.studentId, SubjectId: req.params.subjectId}})
  res.redirect(`/subject/${req.params.subjectId}/give-score`)
})

module.exports = routes
