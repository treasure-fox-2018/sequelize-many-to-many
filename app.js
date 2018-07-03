const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const Student = require('./routes/student')
const Subject = require('./routes/subject')

app.set('view engine','ejs')
app.use(bodyParser.urlencoded({extended:false}))

app.get('/', function (req,res) {
  res.render('index');
})

app.use('/',Student)
app.use('/',Subject)

app.listen(3000, () => console.log('App listening on port 3000'))
