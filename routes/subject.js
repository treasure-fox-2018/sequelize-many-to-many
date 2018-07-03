const routes = require('express').Router()
const models = require('../models')
const Subjects = models.Subject

routes.get('/', (req, res) => {
  Subjects.findAll({
    include: [models.Student]
  })  
    .then(dataSubject => {
      res.send(dataSubject)
    })
})

routes.get('/')




module.exports = routes