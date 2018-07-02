const routes = require('express').Router()
const models = require('../models')
const Students = models.Student

routes.get('/student',(req, res) => {
  Students.findAll({
    include: [models.Subject]
  })
  .then(dataStudent => {
    res.send(dataStudent)
  })
})

module.exports = routes