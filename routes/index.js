

const express = require("express")
const router = express.Router()
const model = require("../models")

router.get("/students", function(req, res){
    let students = model.Student.findAll({
        include:[model.Subject],
        order : [['id','asc']]
    })

    Promise.all([students])
    .then(function(values){
        res.render("students", {
            students:values[0],
        })
    })
    .catch(function(err){
        res.json(err)
    })
})

router.get("/students/:id/add-subject", function(req,res){
    let students = model.Student.findById(req.params.id)
    let subjects = model.Subject.findAll()

    Promise
    .all([students,subjects])
    .then(function(values){
        res.render("add-subjects-ToStudent", {
            student:values[0],
            subjects :values[1],
        })
    })
})

router.post("/students/:id/add-subject", function(req,res){
  
    model.StudentSubject
    .create({
        StudentId : req.params.id,
        SubjectId : req.body.SubjectId
    })
    .then(function(student){
        res.redirect("/students")
    })
    .catch(function(err){

    })
})

router.get("/subjects", function(req,res){
    model.Subject
    .findAll({
        include:[{
            model : model.Teacher
        }],
    })
    .then(function(subjects){
        res.render("all-subjects-data", {subjects:subjects})
    })
})

router.get("/subjects/:id/enrolled-students",function(req,res){
    model.StudentSubject
    .findAll({
        include : [model.Student, model.Subject],
        where : {SubjectId:req.params.id}
    })
    .then(function(studentsubject){
        let subject = studentsubject[0].Subject.subjectName
        res.render("enrolledSubject", {title:subject, subjects:studentsubject})
    })
    .catch(function(err){
        res.json(err)
    })
})


module.exports = router