const express = require('express')
const app = express()
const port = 3000
const models = require('./models')
const bodyParser = require('body-parser')
const routesIndex   = require('./routes/index')
const routesTeacher = require('./routes/teachers')
const routesStudent = require('./routes/students')
const routesSubject = require('./routes/subjects')


app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: false}))

app.use('/',routesIndex)
app.use('/students', routesStudent)
app.use('/teachers', routesTeacher)
app.use('/subjects', routesSubject)

app.listen(port ,function () {
  console.log("server is running on port",port)
})