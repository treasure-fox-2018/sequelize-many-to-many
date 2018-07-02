const express = require('express')
const router = express()
const model = require('../models')

router.get('/', function(req, res){
    res.send('yuuuhuuuu!!')
})

router.get('/students', function(req, res){
    model.Student.findAll()
    .then(students => {
        res.render('students', {students})
    })
    .catch(err => {
        res.send(err)
    })
})

router.get('/students/:id/add-subject', function(req, res){
    let id = req.params.id
    model.Student.findById(id)
    .then(students => {
        res.render('addSubjectToStudent', {students})
        // res.json(students)
    })
    .then(err => {
        res.send(err)
    })
})

router.post('/students/:id/add-subject', function(req, res){
    let id = req.params.id
    model.StudentSubject.create({
        StudentId : id,
        SubjectId: req.body.SubjectId
    })
    .then(newStudentSubject => {
        res.redirect('/students')
    })
    .catch(err => {
        res.send(err)
    })
})

router.get('/subjects', function(req, res){
    model.Subject.findAll({include : ['Teachers']})
    .then(subjects => {
        res.render('subjects', {subjects})
        // res.json(subjects)
    })
    .catch(err => {
        res.send(err)
    })
})

router.get('/subjects/:id/enrolled-students', function(req, res){
    let id = req.params.id
    model.StudentSubject.findAll({
        where: {
            id
        }, include: ['Students']
    })
    .then(studentSubjectData => {
        // res.render('studentSubjects', {studentSubjectsData})
        res.json(studentSubjectData)
    })
    .catch(err => {
        res.send(err)
    })
})

module.exports = router