const app = require('express')();
const homeRoute = require('./routes/index');
const studentRoute = require('./routes/student.js');
const subjectRoute = require('./routes/subject.js');
const teacherRoute = require('./routes/teacher.js');
const bodyParser = require('body-parser');
app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());

//helpers
app.locals.teacherHelper = require ('./helpers/teacher.js')
app.locals.subjectHelper = require ('./helpers/subject.js')

// connection to routes
app.use('/', homeRoute)
app.use('/students', studentRoute)
app.use('/subjects', subjectRoute)
app.use('/teachers', teacherRoute)


// turn on the server
app.listen (3000, () => {
  console.log('connected to server')
})
