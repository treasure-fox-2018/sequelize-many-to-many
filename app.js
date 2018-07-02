const app = require('express')()
// const index = require('./routes/index')
const students = require('./routes/students')
const teachers = require('./routes/teachers')
const subjects = require('./routes/subjects')

const bodyParser = require('body-parser')

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/', students)
app.use('/students', students)
app.use('/teachers', teachers)
app.use('/subjects', subjects)

app.listen(3000, () => {
  console.log('listening on port 3000')
})