const routes = require('express').Router();
const models = require('../models');

routes.get('/',function(req,res){
    models.Subject
    .findAll({
        attributes:['id','subject_name'],
        include:[{model: models.Student}]
    })
    .then(function(subjects){
        // res.send(subjects)
        res.render('subject.ejs',{dataSubject: subjects})
    })
})

routes.get('/:id/enrolled-students',function(req,res){
    models.Subject
    .findById(req.params.id,{
        include:[{
            model: models.Student,
            through:{
                attributes:['id','first_name','last_name']
            }
        }],
    })
    .then(function(subject){
        // res.send(subject);
        res.render('subjectEnrolledStudent.ejs',{dataSubject: subject})
    })
})

module.exports = routes