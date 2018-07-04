const app = require('express')();
const ejs = require('ejs');
const bodyParser = require('body-parser');
const routes = require('./routes');
const studentRoutes = require('./routes/student');
const teacherRoutes = require('./routes/teacher');
const subjectRoutes = require('./routes/subject')

app.set('view engine','ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use('/',routes);
app.use('/students',studentRoutes);
app.use('/teacher',teacherRoutes);
app.use('/subjects',subjectRoutes);


app.listen(3000,function(){
    console.log('App listening on port 3000')
})
