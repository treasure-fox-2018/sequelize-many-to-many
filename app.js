const express = require('express')
const app = express()
let indexRouter = require('./routes/index')
const student = require('./routes/student')
const subject = require('./routes/subject')
const bodyParser = require('body-parser')
const registerStudent = require('./routes/register-student')

app.use(bodyParser.urlencoded({ extended: true }));

app.use('/students', student)

app.use('/subjects', subject)
// app.use('/', homepage)
app.use('/students/register', registerStudent)

app.use('/', indexRouter)


app.listen(3000, (req, res) => {
    console.log('Connected with PORT 3000');
})