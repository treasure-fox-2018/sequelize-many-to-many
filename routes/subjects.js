const routessubjects = require('express').Router();
const models = require('../models');
const Subjects = models.Subject;
const StudentSubjects = models.StudentSubject;
const Students = models.Student;


routessubjects.get('/subjects', (req, res) => {
    // res.send('yay subjects')
    Subjects.findAll({
        order: [['id', 'ASC']],
        include: [models.Student, models.Teacher],
    })
    .then(subjectsData => {
        // res.send(subjectsData)
        res.render('subjects.ejs', {title: "Subjects Available", subjectsData: subjectsData})
    })
    .catch(err => {
        res.send(err)
    })  
})

routessubjects.get('/subjects/add', (req, res) => {
    res.render('subjectadd.ejs', {title: 'Subject Form', error:null})
})

routessubjects.post('/subjects/add', (req, res) => {
    Subjects.create({
        subjectName: req.body.subjectName,
        createdAt: new Date(),
        updatedAt: new Date()
    })
    .then(subjectsData => {
        res.redirect('/subjects')
    })
    .catch(err => {
        res.render('subjectadd.ejs', {title: 'Subject Form', error: err.message})
    })
})

routessubjects.get('/subjects/edit/:id', (req, res) => {
    Subjects.findById(req.params.id)
    .then(editSubject => {
        res.render('subjectedit.ejs', {title: 'Edit Subject',
    editSubject: editSubject})
    })
    .catch(err => {
        res.send({error: err.message})
    })
})

routessubjects.post('/subjects/edit/:id', (req, res) => {
    Subjects.update({
        subjectName: req.body.subjectName},
        {where: {id: req.params.id}
    })
    .then(() => {
        res.redirect('/subjects')
    })
    .catch(err => {
        res.send(err)
    })
})

routessubjects.get('/subjects/delete/:id', (req, res) => {
    Subjects.destroy({where: {id: req.params.id}
    })
    .then(() => {
        res.redirect('/subjects')
    })
    .catch(err => {
        res.send(err)
    })
})


routessubjects.get('/subjects/:id/enrolled-students', (req, res) => {
    Subjects.findAll({where: {id: req.params.id}, include : [models.Student]})
    .then(studentsubjectData => {
        // res.send(studentsubjectData[0])
        res.render('studentsubject.ejs', {studentsubjectData: studentsubjectData, error: null})
    })
    .catch(err => {
        res.send('studentsubject.ejs', {error: err.message})
    })
})

routessubjects.get('/subjects/:idSubject/give-score/:idStudent', (req, res) => {
    Students.findOne({where: {id: req.params.idStudent}, include: [models.StudentSubject]})
    .then(students => {
        // res.send(students)
        res.render('subjectgive-score.ejs', {title: 'Give Score', idsubject: req.params.idSubject, idstudent: req.params.idStudent, students: students, error:null})
        // res.redirect('/subjects')
    })
    // .catch(err => {
    //     res.send('subjectgive-score.ejs', {title: 'Give Score', error: err.message})
    // })
})

routessubjects.post('/subjects/:idSubject/give-score/:idStudent', (req, res) => {
    // res.send(req.body)
    StudentSubjects.update(
        {
            Score: req.body.Score
        }, {
            where: {
                SubjectId: req.params.idSubject, 
                StudentId : req.params.idStudent
            }
        })
    .then(() => {
        res.redirect(`/subjects/${req.params.idSubject}/enrolled-students`)
    })
    .catch(err => {
        res.send('subjectgive-score.ejs', {title: 'Give Score', error: err.message})
    })
})




module.exports = routessubjects;