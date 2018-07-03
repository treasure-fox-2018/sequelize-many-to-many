const express = require('express')
const app = express()
let indexRouter = require('./routes/index')
const student = require('./routes/student')
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: true }));

app.use('/students', student)
app.use('/', indexRouter)


app.listen(3000, (req, res) => {
    console.log('Connected with PORT 3000');
})