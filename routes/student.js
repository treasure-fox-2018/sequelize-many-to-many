var express = require('express')
var router = express.Router()
var models = require('../models')


router.get('/',(req,res) => {
    models.Student.findAll({
        order : [
            ["id","ASC"]
        ]
    })
    .then(student => {
        res.render('student',{dataStudent: student})
    })
    // res.send('studen')
}) 

router.get('/add',(req,res) => {
    res.render('addStudent')
})

router.post('/',(req,res) => {
    models.Student.create({
        firstName : req.body.firstname,
        lastName : req.body.lastname,
        email : req.body.email
    })
    .then(function(){
        res.redirect('/student')
    })
})

router.get('/edit/:id',function(req,res){
    models.Student.findById(req.params.id)
    .then(function(student){
        // console.log(student);
        
        res.render('editStudent',{dataStudent:student})
        res.send(student)

    })
})

router.post('/edit/:id',(req,res) => {
    models.Student.update({
        firstName : req.body.firstName,
        lastName :req.body.lastName,
        email : req.body.email
    },{where : {id:req.params.id}})
    .then(function(){
        res.redirect('/student')
    })
})

router.get('/delete/:id',(req,res)=> {
    models.Student.destroy({where:{id:req.params.id}})
    .then( ()=> {
        res.redirect('/student')
    })
})

router.get('/:id/add-subject',(req,res) => {
    models.Student.findById(req.params.id)
    .then(function(student){
        // console.log(student);
        models.Subject.findAll()
        .then(function(subject){
            // console.log(subject);
            res.render('addSubjectStudent',{dataStudent:student, dataSubject:subject})
        })
    })
})

router.post('/:id/add-subject',(req,res)=> {
    // res.send(req.params.id)
    models.SubjectStudent.create({
        SubjectId : req.body.SubjectId,
        StudentId : req.params.id
    })
    .then(() => {
        res.redirect('/student')
    })
})

module.exports = router