const express = require('express');
const router  = express.Router()
const model = require('../models')

router.get('/student',function(req,res){
    model.Student.findAll({
        order: [["id","ASC"]],
    })
    .then((data_student) => {
        res.render('student',{dataStudent: data_student})
    })
})

//Menampilkan Form Add
router.get('/student/add',function(req,res){
    res.render('add_student')
})

//Mengirim Data ke Database
router.post('/student/add', function(req,res){
    model.Student.create({
        FirstName: req.body.FirstName,
        LastName: req.body.LastName,
        Email: req.body.Email,
    })
    .then(() => {
        res.redirect('/student')
    })
})

//Delete Data
router.get('/student/delete/:id',function(req,res){
    model.Student.destroy({where: {id:req.params.id}})
    .then(()=> {
        res.redirect('/student')
    })
})

//Edit Data
router.get('/student/edit/:id',function(req,res){
    model.Student.findById(req.params.id)
    .then((data_student) => {
        res.render('edit_student', {dataStudent: data_student})
    })
})

//Mengirim Data Baru
router.post('/student/edit/:id', function(req,res){
    model.Student.update({
        FirstName: req.body.FirstName,
        LastName: req.body.LastName,
        Email: req.body.Email,
        SubjectName: req.body.SubjectName,
    },{where: {id: req.params.id}})
    .then(() => {
        // console.log(data_teacher)
        res.redirect('/student')
    })
})

//Menampilkan Form Add Subject
router.get('/student/addsubject/:id',function(req,res){
    model.Student.findById(req.params.id)
    .then((data_student) => {
        res.render('add_subject', {dataStudent: data_student})
    })
})

//Mengirim Data Subject Student
router.post('/student/addsubject/:id',(req,res)=>{
    let studentId = req.params.id
    model.Subject.findOne({
        where:{SubjectName:req.body.name}
    }).then(subject=>{
        model.SubjectStudent.create({
            SubjectId:subject.id,
            StudentId:studentId
        }).then(result=>{
           res.redirect('/student')
        }).catch(err=>{
            console.log(err)
        })
    })
})


module.exports = router;
