const routes = require('express').Router();
const models = require('../models')

routes.get('/',function(req,res){
    models.Student
    .findAll({
        attributes:['id','first_name','last_name','email'],
        include: [{model: models.Subject}]
    })
    .then(function(students){
        // res.send(students)
        res.render('student.ejs',{dataStudents: students})
    })  
})

routes.get('/:id/add-subject',function(req,res){
    models.Student
    .findById(req.params.id)
    .then(function(student){
        models.Subject.findAll({
            attributes:['id','subject_name']
        })
        .then(function(subjects){
            // res.send(student)
            // res.send(subjects)
            res.render('studentAddSubject.ejs',{
                dataStudent: student,
                dataSubjects: subjects
            })
        })
    })
})

routes.post('/:id/add-subject',function(req,res){
    models.StudentSubject
    .create({
        StudentId:req.params.id,
        SubjectId:req.body.subjectId
    })
    .then(function(){
        res.redirect('/subjects')
    })
    .catch(function(err){

    })
    // console.log(req.body)
})

module.exports = routes