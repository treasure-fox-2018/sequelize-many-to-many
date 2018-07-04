const router = require('express').Router()
const models = require('../models')
const Student = models.Student

router.get('/', (req, res) => {
    Student.findAll()
    .then(function(subject){
        res.render('register-student.ejs', {dataSubjects:Student})
    })
})

router.post('/', (req, res) => {
    console.log(req.body);
    Student.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email
    })
    .then(() => {
        res.redirect('/students')
    })
    .catch(err => {

    })
})

module.exports = router