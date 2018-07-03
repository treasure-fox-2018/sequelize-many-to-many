const express = require('express')
const app = express()
const router = require('./routers')
const routerStudent = require('./routers/students')
const routerSubject = require('./routers/subjects')

app.use(express.urlencoded( { extended:false } ))
app.use('/', router)
app.use('/students', routerStudent)
app.use('/subjects', routerSubject)
app.set('view engine', 'ejs')
app.listen(3000, function(){
    console.log('Listening to app 3000')
})
