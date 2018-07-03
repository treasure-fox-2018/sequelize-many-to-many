const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const Home = require('./routes/index')
const Student = require('./routes/student')
const Subject = require('./routes/subject')

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended:false}))

app.use('/', Home)
app.use('/', Student)
app.use('/', Subject)

app.listen(3000, console.log('Server is Running'))