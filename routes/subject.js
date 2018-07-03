const express = require('express')
const routes = express.Router()
const models = require('../models')

routes.get('/subjects', function(req,res) {
    models.Subject.findAll()
    .then((dataSubject) => {
        res.render('subjects', {dataSubject: dataSubject})
    })
})

routes.get('/subjects/:id/enrolled-students/',function(req,res){
    models.Subject.findById(req.params.id,{
        include: {
            model: models.Student
        }
    })
    .then((dataStudentSubject) => {
        res.render('enrolled-students', {dataStudentSubject: dataStudentSubject})
        // res.send(dataStudentSubject)
    })
})

routes.get('/subjects/:id/give-score',function(req,res) {
    res.render('give-score')
})

module.exports = routes