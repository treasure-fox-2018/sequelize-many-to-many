const routessubjects = require('express').Router();
const models = require('../models');
const Subjects = models.Subject;

routessubjects.get('/subjects', (req, res) => {
    // res.send('yay subjects')
    Subjects.findAll({
        order: [['subjectName', 'ASC']],
        // include: [models.Teacher]
    })
    .then(subjectsData => {
        res.send(subjectsData)
        // res.render('subjects.ejs', {title: "Subjects Available", subjectsData: subjectsData})
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
})

routessubjects.post('/subjects/edit/:id', (req, res) => {
    Students.update({
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





module.exports = routessubjects;