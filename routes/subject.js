const express = require('express')
const routes = express.Router()
const model = require('../models')

routes.get('/subject', (req,res) => {
    model.Subject.findAll()
    .then((dataSubject) => {
        res.render('./subject.ejs', {dataSubject})
    })
})

module.exports = routes