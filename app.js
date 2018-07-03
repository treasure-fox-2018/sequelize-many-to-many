const express = require('express')
const app = express()
const index = require('./routes/index.js')
const student = require('./routes/student.js')
const subject = require('./routes/subject')
const bodyParser = require('body-parser')

app.set('views engine', 'ejs');
app.use(bodyParser.urlencoded({extended:false}))
app.use('/', index)
app.use('/', student)
app.use('/',subject)


// app.get('/', (req,res) => {
//     res.send('HALO CIMING')
// })
app.listen(3000, () => console.log('my express'))