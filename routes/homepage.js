const routeshomepage = require('express').Router();
// const models = require('../models');

routeshomepage.get('/', (req, res) => {
    res.render('homepage.ejs', {home: "Welcome to School's homepage"})
})

module.exports = routeshomepage;