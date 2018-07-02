const express = require('express')
const app = express()
let route = require('./routes/students')
let subject = require('./routes/subjects')
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(route)
app.use(subject)

let ejs = require('ejs')
app.set('view engine', 'ejs')
app.get('/', (req, res) => res.send('Hello World!'))

app.listen(3000, () => console.log('Example app listening on port 3000!'))
