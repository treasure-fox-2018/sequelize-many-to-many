
/////Tools////
const express = require('express');
const app = express()
const path = require('path')
const bodyParser = require('body-parser')
var port = process.env.PORT || 3000
/////////////

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'));
const students = require('./routes/students.js')
// const subjects = require('./routes/subjects.js')


app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname,'public')));

app.use('/', students)


app.listen(port, () => {


    console.log(`server is connecting to port ${port}....`)

})

module.exports = app