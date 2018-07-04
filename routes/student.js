var express = require('express')
var router = express.Router()
var models = require('../models')

router.get('/', function(req,res){
    models.Student.findAll()
    .then(students => {
        res.render('student.ejs',{students: students})
    })
})

router.get('/add', function(req, res){
    res.render('new_student.ejs', {error: null})
})

router.post('/', function(req, res){
    models.Student.create({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email
    })
    .then(function(){
        res.redirect('/students')
    })
    .catch(function(err){
        let inputdata = {first_name: req.body.first_name, last_name: req.body.last_name,email: req.body.email}
        res.render('new_student.ejs', {inputData: inputdata, error: err.message})
    })

})

router.get('/:id/add-subject', function(req,res){
    models.Student.findById(req.params.id)
    .then(student => {
        models.Subject.findAll()
        .then(subjects => {
            res.render('add_subject.ejs', {student:student, subjects:subjects})
        })
    })
    .catch(err => {
        then.send(err.message)
    })
})

router.post('/:id/add-subject', function(req,res){
    let studentsubject = {
        StudentId: req.params.id,
        SubjectId: req.body.subjectId
    }

    models.StudentSubject.create(studentsubject)
    .then(function(){
        res.redirect('/students')
    })
})

router.get('/edit/:id', function(req,res){
    models.Student.findById(req.params.id)
    .then(student=>{
        res.render('student_edit.ejs',{student:student})
    })
})

router.post('/edit/:id',function(req,res){
    models.Student.update({
        first_name:req.body.first_name,
        last_name:req.body.last_name,
        email:req.body.email
    },{
        where : {id:req.params.id}
    })
    .then(student=>{
        res.redirect('/students')        
    })
    .catch(err=>{
        res.send(err.message)
    })
})


router.get('/delete/:id',function(req,res){
    Student.destroy({
        where:{id:req.params.id}
        })
        .then(student=>{
            res.redirect('/students')
        })
        .catch(err=>{
            console.log(err.message);
        })
    })


module.exports = router