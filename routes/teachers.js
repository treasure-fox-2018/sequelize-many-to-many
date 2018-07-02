const routesteachers = require('express').Router();
const models = require('../models');
const Teachers = models.Teacher;

routesteachers.get('/teachers', (req, res) => {
    // res.send('yay teachers')
    Teachers.findAll({
        order: [['id', 'ASC']],
        include : [models.Subject]
    })
        .then(teachersData => {
            res.send(teachersData)
            // res.render('teachers.ejs', { title: "List of Teachers", teachersData: teachersData })
        })
        .catch(err => {
            res.send(err)
        })
})

routesteachers.get('/teachers/add', (req, res) => {
    res.render('teacheradd.ejs', { title: 'Teacher Form' , error : null})
})

routesteachers.post('/teachers/add', (req, res) => {
    // console.log(req.body)
    Teachers.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        SubjectId: req.body.SubjectId,
        createdAt: new Date(),
        updatedAt: new Date()
    })
        .then(() => {
            res.redirect('/teachers')
        })
        .catch(err => {
            res.render('teacheradd.ejs', { title: 'Teacher Form' , error: err.message})
        })
})

routesteachers.get('/teachers/edit/:id', (req, res) => {
    Teachers.findById(req.params.id)
        .then(editTeacher => {
            res.render('teacheredit.ejs', {
                title: 'Edit Teacher',
                editTeacher: editTeacher
            })
        })
})

routesteachers.post('/teachers/edit/:id', (req, res) => {
    Teachers.update({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email
    }, {
        where: { id: req.params.id }
        })
        .then(() => {
            res.redirect('/teachers')
        })
        .catch(err => {
            res.send(err)
        })
})

routesteachers.get('/teachers/delete/:id', (req, res) => {
    Teachers.destroy({ where: { id: req.params.id } })
        .then(() => {
            res.redirect('/teachers')
        })
        .catch(err => {
            res.send(err)
        })
})




module.exports = routesteachers;