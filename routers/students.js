const express = require('express')
const router = express()
const model = require('../models')

router.get('/', function(req, res){
    model.Student.findAll({
        order : [['id', 'ASC']]
    })
    .then(students => {
        res.render('students/students', {students})
    })
    .catch(err => {
        res.send(err)
    })
})

router.get('/add', function(req, res){
        res.render('students/addStudent')
})

router.post('/add', function(req, res){
    model.Student.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email
    })
    .then(students => {
        res.redirect('/students')
    })
    .catch(err => {
        res.send(err)
    })
})

router.get('/:id/add-subject', function(req, res){
    let id = req.params.id
    model.Student.findById(id)
    .then(students => {
        res.render('students/addSubjectToStudent', {students})
        // res.json(students)
    })
    .then(err => {
        res.send(err)
    })
})

router.post('/:id/add-subject', function(req, res){
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

router.get('/:id/delete', function(req, res){
    let id = req.params.id
    model.Student.destroy({
        where: {id}
    })
    .then(delStudent => {
        res.redirect('/students')
    })
    .catch(err => {
        res.send(err)
    })
})

router.get('/:id/edit', function(req, res){
    let id = req.params.id
    model.Student.findById(id)
    .then(student => {
        res.render('students/editStudent', {student})
        // res.send(student)
    })
    .catch(err => {
        res.send(err)
    })
})

router.post('/:id/edit', function(req, res){
    let id = req.params.id
    model.Student.update({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email
    }, {where : {id}})
    .then(student => {
        res.redirect("/students")
    })
    .catch(err => {
        res.send(err)
    })
})

module.exports = router
