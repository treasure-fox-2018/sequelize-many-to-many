const homepage = require('express').Router();

homepage.get('/', (request, response) => {
  response.render('homepage')
})

module.exports = homepage;