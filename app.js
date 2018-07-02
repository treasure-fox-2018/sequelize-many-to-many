"use strict"
const routes = require('./routes/index');
const students = require('./routes/students');
const teachers = require('./routes/teachers');
const subjects = require('./routes/subjects');
const app = require('express')();
const ejs = require('ejs');
const bodyParser = require('body-parser');
const express = require('express');
app.set("view engine", "ejs");
app.locals.teacher_helper = require("./helpers/teacherHelper")
app.locals.subject_helper = require('./helpers/subjectHelper');


app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: false}));


app.use("/", routes);
app.use(students, teachers, subjects);


app.listen("3000", () => {
  console.log("server...");
});
