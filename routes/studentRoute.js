'use strict'

const express = require("express")
const model = require("../models")
var Student = model.Student

const routes = express.Router()

routes.get("/student",function(req,res){
    model.Subject.findAll({
        include : [Student]
    })
    .then(function(dataStudent){
        res.json(dataStudent)
        // res.render("data_student",{dataStudent : dataStudent})
    })
    .catch(function(err){
        res.json(err)
    })
})



module.exports = routes