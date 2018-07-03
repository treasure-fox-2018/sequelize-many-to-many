const routes = require('express').Router()
const ejs = require('ejs')
const models = require('../models')




routes.get('/', (req, res) => {

    models.Student.findAll({
        // include: [

        //     models.Subject
        // ]

    }).then(data => {
        res.render('students', { Students: data })
    })
})

routes.get("/students/add", (req, res) => {

    res.render('studentAdd')

})

routes.post('/', function (req, res) {
    // console.log(req.body) //to check udah ada form body atau blom
    models.Student.create({
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




routes.get("/students/:id/add-subject", function (req, res) {

    models.Student.findById(req.params.id)
        .then(studentData => {
            models.Subject.findAll()

                .then(function (subjectData) {
                    // res.send(data)
                    res.render('add-subject', { Students: studentData, Subjects: subjectData })
                })
        })
        .catch(function (err) {
            res.send(err)
        })

})



routes.post('/students/:id/add-subject', function (req, res) {
    // console.log(req.body) //to check udah ada form body atau blom
    let studentId = req.params.id
    models.Subject.findAll({
        where: { subjectName: req.body.name }
    }).then(subject => {
        // console.log(subject)
        models.StudentsSubject.create({
            StudentId: studentId,
            SubjectId: subject.id,
        })
            .then(function () {
                res.redirect('students')
            })
            .catch(function (err) {
                res.send(err)
            })




    })





})



module.exports = routes;
