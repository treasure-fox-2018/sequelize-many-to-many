var express = require('express')
var router = express.Router()
var models = require('../models')

router.get('/',function(req,res){
    models.Subject.findAll({include : models.Teacher})
    .then(function(subject){
            res.render('subject',{dataSubject:subject})
    })
})

router.get('/:id/enrolled-student',(req,res) => {
    models.Subject.findById(req.params.id,{include : [models.SubjectStudent, models.Student]})
    .then(function(subject){
            res.render('enrolled-student',{dataSubject : subject})
            // res.send(subject)
    })
})

router.get('/:id/give-score',(req,res) => {
    models.SubjectStudent.create({
        
    })
    res.render('form_give_score')
})

module.exports = router