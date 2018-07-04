'use strict'
const express = require('express')
let app = express()
let models = require('./models')
var bodyParser = require('body-parser')
let teachersRoute = require('./routes/teacher')
let studentRoute = require('./routes/student')
let subjectRoute = require('./routes/subject')


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.set('view angine', 'ejs')

//teachers
app.use('/teachers', teachersRoute)

//student
app.use('/students', studentRoute)

//subject
app.use('/subjects', subjectRoute)


app.get('/', function(req,res){
    res.render('homepage.ejs')
})




app.listen(3000)