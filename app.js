const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const port = 3030
const routesIndex = require('./routes')
const routesStudent = require('./routes/student')
const routesSubject = require('./routes/subject')

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}))

app.use(routesIndex)
app.use('/student', routesStudent)
app.use('/subject', routesSubject)

app.listen(port, () => {
  console.log(`Listening app on port http://localhost:${port}`);
})