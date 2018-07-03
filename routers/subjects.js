const express = require('express')
const router = express()
const model = require('../models')

router.get('/', function(req, res){
    model.Subject.findAll({include : ['Teachers']})
    .then(subjects => {
        res.render('subjects/subjects', {subjects})
        // res.json(subjects)
    })
    .catch(err => {
        res.send(err)
    })
})

router.get('/:id/enrolled-students', function(req, res){
    let id = req.params.id
    model.StudentSubject.findAll({
        attributes: [ 
            'id',
            'StudentId', 
            'SubjectId',
            'score' ],
        include: ['Student', 'Subject'], 
        where: {SubjectId: id}
    })
    .then(studentSubjectData => {
        res.render('subjects/studentSubjects', {studentSubjectData})
        // res.json(studentSubjectData)
    })
    .catch(err => {
        res.send(err)
    })
})

router.get('/:id/give-score/:subId', function(req, res){
    model.StudentSubject.findAll({
        include: ['Student', 'Subject'], 
        where: {StudentId: req.params.id, 
                SubjectId: req.params.subId}
    })
    .then(addScore => {
        res.render('subjects/addScore', {addScore})
        // res.json(addScore)
    })
    .catch(err => {
        res.send(err)
    })
})

router.post('/:id/give-score/:subId', function(req, res){
    model.StudentSubject.update({
        score: req.body.score
    }, {where: {StudentId: req.params.id, 
        SubjectId: req.params.subId}})
    .then(addScore => {
        res.redirect('/subjects')
    })
    .catch(err => {
        res.send(err)
    })
})

module.exports = router