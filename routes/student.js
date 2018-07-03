const express = require('express')
const routes = express.Router()
const model = require('../models')

routes.get('/student', function(req,res){
    model.Student.findAll()
    .then((dataStudent) => {
        res.render('student.ejs', {dataStudent})
        // res.json(data_teacher)
    })
})
// add student
// routes.get('./student/add', (req,res) => {
//     res.render('addStudent.ejs')
// })
// routes.post('/student', (req,res) => {
//     model.Student.create({
//         firstName:req.body.firstName,
//         LastName:req.body.LastName,
//         email:req.body.email, 
//     })
//     .then(()=> {
//         res.redirect('/student')
//     })
// })

//ambil form ke addsubject
routes.get('./student/addSubject/;id', (req,res) => {
    model.Student.findById(req.params.id)
    .then((dataStudent) => {
        res.render('addSubject.ejs')
    })
})

module.exports = routes