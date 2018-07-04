var express = require('express')
var router = express.Router()
var models = require('../models')

router.get('/', function(req,res){
    models.Subject.findAll({
        include: [models.Teacher]
    })
    .then(subjects => {
        //console.log(subjects[0].Teachers.first_name)
        res.render('subject.ejs', {subjects: subjects})
    })
    .catch(err => {
        res.send(err.message)
    })
})

router.get('/:id/enrolled-students', function(req,res){
    models.StudentSubject.findAll({
        attributes: ['id', 'score'],
        order: [['id', 'ASC']],
        include: [models.Student, models.Subject],
        where: {SubjectId:req.params.id},
        
    })
    .then(subjects => {
        //console.log(subjects[0].Students[0].StudentSubject.SubjectId)
        //console.log(subjects[0].score)
        res.render('enrolled_student.ejs', {subjects:subjects})
    })
    .catch(err => {
        res.send(err)
    })
})

router.get('/:subjectId/:studentId/give-score', function(req,res){
    models.StudentSubject.findAll({
        where: {SubjectId:req.params.subjectId,
                StudentId:req.params.studentId}
    })
    .then(subjects => {
        res.render('add_score.ejs',{subjects:subjects})
        //console.log(subject[0].StudentId)
    })
    .catch(err => {
        res.send(err.message)
    })
})

router.post('/:subjectId/:studentId/give-score', function(req,res){
    models.StudentSubject.update({
        score: req.body.score
    },{
        where: {SubjectId:req.params.subjectId,
                StudentId:req.params.studentId}
    })
    .then(() => {
        res.redirect('/subjects')
    })
    .catch(err => {
        res.send(err.message)
    })
})

module.exports = router