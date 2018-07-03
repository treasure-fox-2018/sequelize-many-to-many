'use strict'

const express = require("express")
const model = require("../models")
var Student = model.Student
var Subject = model.Subject
var SubjectStudent = model.SubjectStudent

const routes = express.Router()

routes.get("/student",function(req,res){
    model.Student.findAll({
        include : [model.Subject]
    })
    .then(function(dataStudent){
        // res.json(dataStudent)
        res.render("data_student",{dataStudent : dataStudent})
    })
    .catch(function(err){
        res.json(err)
    })
})

routes.get("/student/:id/addSubject",function(req,res){
    Student.findById(req.params.id,{
        include : [model.Subject]
    })
    .then(function(data_student){
        // res.json(data_student)
        Subject.findAll()
        .then(function(subject){
            res.render("add_subject_student",{subject :subject ,data_student : data_student})
            // res.json(subject)

        })
        .catch(function(err){
            // res.json(err)
            console.log(err)
        })
    })
    .catch(function(err){
        // res.json(err)
        console.log(err)
    })
})

routes.post("/student/:id/addSubject",function(req,res){
    SubjectStudent.create({
        StudentId : req.params.id,
        SubjectId : req.body.id
    })
    .then(function(){
        res.redirect("/student")
    })
})  



module.exports = routes