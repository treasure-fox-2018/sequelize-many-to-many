const express = require('express');
const app = express();
const ejs = require('ejs');

const homepage = require('./routes/homepage')
const student = require('./routes/student')
const subject = require('./routes/subject')

app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended : false }));
app.set('views', __dirname + '/views');
app.use(express.static('public'));

app.use('/', homepage);
app.use('/student', student);
app.use('/subject', subject);

var server = app.listen(3000, () => {
  console.log('listening to port', server.address().port)
})