const routesstudents = require('express').Router();
const models = require('../models');
const Students = models.Student;
const Subjects = models.Subject;

routesstudents.get('/students', (req, res) => {
    // res.send('hello students!')
    Students.findAll({
        order: [['id', 'ASC']],
        // include: [models.Subject]
    })
    .then(studentsData => {
        // console.log(studentsData)
        res.render('students.ejs', {title: 'Students List', studentsData: studentsData})
    })
    .catch(err => {
        res.send(err)
    })
})

routesstudents.get('/students/add', (req, res) => {
    res.render('studentadd.ejs', {title: 'Student Form', error: null})
})

routesstudents.post('/students/add', (req, res) => {
    Students.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        createdAt: new Date(),
        updatedAt: new Date()
    })
    .then(() => {
        res.redirect('/students')
    })
    .catch(err => {
        res.render('studentadd.ejs', {title: 'Student Form', error: err.message})
    })
})

routesstudents.get('/students/edit/:id', (req, res) => {
    Students.findById(req.params.id)
        .then(editStudent => {
            res.render('studentedit.ejs', {
                title: 'Edit Student',
                editStudent: editStudent
            })
        })
})

routesstudents.post('/students/edit/:id', (req, res) => {
    Students.update({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email
    }, {
        where: { id: req.params.id }
        })
        .then(() => {
            res.redirect('/students')
        })
        .catch(err => {
            res.send(err)
        })
})

routesstudents.get('/students/delete/:id', (req, res) => {
    Students.destroy({ where: { id: req.params.id } })
        .then(() => {
            res.redirect('/students')
        })
        .catch(err => {
            res.send(err)
        })
})

routesstudents.get('/students/:id/add-subject', (req, res) => {
    Students.findById(req.params.id)
    .then(students => {
        Subjects.findAll()
        .then(subjects => {
            res.render('add-subjecttostudent.ejs', {students, subjects, error:null})
        })
        
    })
    .catch(err => {
        res.send(err)
    })
})

routesstudents.post('/students/:id/add-subject', (req, res) => {
    StudentSubjects.create({
        StudentId: id, SubjectId:req.body.SubjectId
    })
    .then(studentsubjectdata => {
        res.redirect('/students')
    })
    .catch(err => {
        res.render('add-subjecttostudent.ejs', {students, subjects, error: err.message})
    })
})

module.exports = routesstudents;