const express = require('express')
const app = express()
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded())
app.set('view engine','ejs')

var subjectRouter = require('./routes/subject')
app.use('/subject',subjectRouter)

var studentRouter = require('./routes/student')
app.use('/student',studentRouter)

var homePageRouter = require('./routes/index')
app.use('/',homePageRouter)


app.listen(3000, () => {
    console.log('port jalan');
    
})