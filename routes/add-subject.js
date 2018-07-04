const router = require('express').Router()
const models = require('../models')
const Student = models.Student
const Subject = models.Subject

router.get('/',(req, res) => {
    let = req.body.id
    Student.findById(id)
    .then()
})

module.exports = router