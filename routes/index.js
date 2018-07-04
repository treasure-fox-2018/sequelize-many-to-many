const routes = require('express').Router();
const models = require('../models');

routes.get('/',function(req,res){
    res.render('index.ejs')

})

module.exports = routes