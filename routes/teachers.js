const routes = require('express').Router()
const ejs = require('ejs')
const models = require('../models')



routes.get('/', (req, res) => {

    models.Teacher.findAll({
        include: [

            models.Subject
        ]

    }).then(data => {
        res.render('teacher', { Teachers: data })
    })
})




routes.get('/teacher/add', (req, res) => {

    res.render('teacherAdd')

})

routes.post('/', function (req, res) {
    // console.log(req.body) //to check udah ada form body atau blom
    models.Teacher.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        subject: req.body.subjectId,

    })

        .then(function () {
            res.redirect('/')
        })
        .catch(function (err) {
            res.send(err)
        })
})



routes.get('/subjects', (req, res) => {

    models.Subject.findAll({

        include: [
            models.Teacher
        ]

    }).then(data => {
        res.render('subject', {
            Subjects: data,
        })
        // console.log(data[0].Teachers)

    })
})

routes.get('/teacher/edit/:id', function (req, res) {

    models.Teacher.search()

})

routes.post('/teacher/edit/:id', function (req, res) {
    models.Teacher.update({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        subject: req.body.subjectId,

        where: { id: req.params.id }

    })
        .then(function (teacher) {
            res.redirect('/')
        })
        .catch(function (err) {
            res.send(err)

        })

})

routes.get('/teacher/delete/:id', function (req, res) {
    models.Teacher.destroy({
        where: { id: req.params.id }
    })
        .then(function (teacher) {
            res.redirect('/')
        })
        .catch(function (err) {
            res.send(err)

        })
})
// console.log(JSON.stringify(models.Subject.id))

module.exports = routes;

