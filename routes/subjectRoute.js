

'use strict'

const express = require("express")
const model = require("../models")
var Subject = model.Subject
var Teacher = model.Teacher
var Student = model.Student
var SubjectStudent = model.SubjectStudent
const routes = express.Router()


routes.get("/subject",function(req,res){
    Subject.findAll({
        order : [
            ["id","ASC"]
        ],
        include : [Teacher,model.Student]
    })
    .then(function(allData){
        res.render("data_subject",{allData : allData})
        // res.json(allData)
    })
    .catch(function(err){
        res.json(err)
    })
})

routes.get("/subject/add",function(req,res){
    res.render("subject_add",{err : null})
})

routes.post("/subject/add",function(req,res){
    Subject.create({
        subject_name : req.body.subject_name
    })
    .then(function(){
        res.redirect("/subject")
    })
    .catch(function(err){
        res.render("subject_add",{err : err.message})
    })
})

routes.get("/subject/:id/edit",function(req,res){
    Subject.findById(req.params.id)
    .then(function(dataSubject){
        res.render("edit_subject",{dataSubject : dataSubject,err : null})
    })
})

routes.post("/subject/:id/edit",function(req,res){
    Subject.update({
        subject_name : req.body.subject_name
    },{
        where : {id:req.params.id}
    })
    .then(function(){
        res.redirect("/subject")
    })
    .catch(function(err){
        Subject.findById(req.params.id)
        .then(function(dataSubject){
            res.render("edit_subject",{dataSubject : dataSubject,err : err.message})
        })
    })
})

// routes.get("/subject/:id/edit_subject",function(req,res){
//     Subject.findById(req.params.id)
//     .then(function(dataSubject){
//         res.render("edit_subject_only",{dataSubject : dataSubject,err : null})
//     })
// })

// routes.post("/subject/:id/edit_subject",function(req,res){
//     Subject.update({
//         subject_name : req.body.subject_name
//     },{
//         where : {id:req.params.id}
//     })
//     .then(function(){
//         res.redirect("/subject")
//     })
//     .catch(function(err){
//         Subject.findById(req.params.id)
//         .then(function(dataSubject){
//             res.render("edit_subject_only",{dataSubject : dataSubject,err : err.message})
//         })
//     })
// })

routes.get("/subject/:id/delete",function(req,res){
    Subject.destroy({
        where : {id : req.params.id}
    })
    .then(function(){
        res.redirect("/subject")
    })
})

routes.get("/subject/:id/enrolled-students",function(req,res){
    SubjectStudent.findAll({
        include :[Subject,Student],
        where : {
            SubjectId : req.params.id
        }
    })
    .then(function(dataSubject){
        // res.json(dataSubject)
        res.render("enrolled_student",{dataSubject : dataSubject})
    })
})

routes.get("/subject/:id/give-score/:subId",function(req,res){
    SubjectStudent.findAll({
        include : [Subject,Student],
        where : {
            StudentId : req.params.id,
            SubjectId : req.params.subId
        }
    })
    .then(function(dataStudent){
        // res.json(dataStudent)
        res.render("student_score",{dataStudent : dataStudent})
    })
})

routes.post("/subject/:id/give-score/:subId",function(req,res){
    SubjectStudent.update({
        score : req.body.score
        },
        {where : {
            StudentId : req.params.id,
            SubjectId : req.params.subId
        }
    })
    .then(function(){
        res.redirect("/subject")
    })
    .catch(function(err){
        // console.log(err)
        // SubjectStudent.findById({
        //     include : [Subject,Student],
        //     where : {
        //         id : req.params.id
        //     }
        // })
        // .then(function(dataStudent){
        //     res.render("student_score"),{dataStudent : dataStudent}
        // })
        console.log(err)
    })
})

module.exports = routes

