const routes = require('express').Router()
const models = require('../models')
const Subjects = models.Subject

routes.get('/subject', (req, res) => {
  Subjects.findAll({
    include: [models.Student]
  })  
    .then(dataSubject => {
      res.send(dataSubject)
    })
})

module.exports = routes