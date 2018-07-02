'use strict'
const express = require('express');
const app = express();

const routeshomepage = require('./routes/homepage');
const routesteachers = require('./routes/teachers');
const routessubjects = require('./routes/subjects');
const routesstudents = require('./routes/students');

const ejs = require('ejs');
const bodyParser = require('body-parser');


app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:false}));
app.use(routeshomepage);
app.use(routesteachers);
app.use(routessubjects);
app.use(routesstudents);

app.listen('3000', () => {
    console.log('server started at port 3000')
})