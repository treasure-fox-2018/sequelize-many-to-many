const routesstudents = require('express').Router();
const models = require('../models');
const Students = models.Student;
const StudentSubjects = models.StudentSubject;
const Subjects = models.Subject;

routesstudents.get('/students', (req, res) => {
    // res.send('hello students!')
    Students.findAll({
        order: [['id', 'ASC']],
        include: [models.Subject]
    })
    .then(studentsData => {
        // res.send(studentsData)
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
        SubjectId: req.body.SubjectId,
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
        id: req.params.id,
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
            // res.send(subjects)
    //         res.send(students)
            res.render('add-subjecttostudent.ejs', {studentsData : students, subjectsData : subjects, error:null})
        })
        
    })
    .catch(err => {
        res.render('add-subjecttostudent.ejs', {error: err.message})
    })
})

routesstudents.post('/students/:id/add-subject', (req, res) => {
    
    StudentSubjects.create({
        StudentId: req.params.id, SubjectId: req.body.SubjectId
    })
    .then(() => {
        res.redirect('/students')
    })
    .catch(err => {
        res.render('add-subjecttostudent.ejs', {error: err.message})
    })

})

module.exports = routesstudents;