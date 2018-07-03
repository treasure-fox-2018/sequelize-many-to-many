const express = require('express')
const routes = express.Router()
const models = require('../models')

routes.get('/student',function(req,res){
    models.Student.findAll({
        order: [["id","ASC"]]
    })
    .then((dataStudent) => {
        // console.log(dataStudent)
        res.render('student',{dataStudent: dataStudent})
    })
})

routes.get('/student/add', function(req,res) {
   res.render('add_student')
})

routes.post('/student/add', function(req,res){
    models.Student.create({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
    })
    .then(() => {
        res.redirect('/student')
    })
})

routes.get('/student/edit/:id', function(req,res){
    models.Student.findById(req.params.id)
    .then((dataStudent) => {
        res.render('edit_student', {dataStudent: dataStudent})
    })
})

routes.post('/student/edit/:id', function(req,res){
    models.Student.update({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
    },{where: {id: req.params.id}})
    .then(() => {
        res.redirect('/student')
    })
})

routes.get('/student/delete/:id', function(req,res){
    models.Student.destroy({where: {id:req.params.id}})
    .then(() => {
        res.redirect('/student')
    })
})

routes.get('/student/:id/add-subject', function(req,res){
    models.Student.findById(req.params.id)
    .then((dataStudent) => {
        models.Subject.findAll()
        .then((dataSubject) => {
            res.render('add_subject_to_student',{dataStudent: dataStudent, dataSubject: dataSubject})
        })
    })
})

routes.post('/student/:id/add-subject', function(req,res){
    console.log(req.params.id)
    console.log(req.body)
    
    models.StudentSubject.create({
        StudentId: req.params.id,
        SubjectId: req.body.subject_id
    })
    .then(() => {
        res.redirect('/student')
    })
})


module.exports = routes