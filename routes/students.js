const app = require('express').Router();
const ejs = require('ejs');
const controller = require('../controller/students');
const subject = require('../controller/subjects');
const StudentSubject

app.get('/student', (req, res) => {
  controller.showAllData()
    .then(studentData => {
      // console.log(studentData[5].Subjects[0].subject_name)
      res.render('../views/student-dashboard', {
        data: studentData,
      })
    })
    .catch(err => {
      res.send(err);
    })
  // res.end();
})

app.get("/student/add", function(req, res) {
  let input = req.body;
  res.render('../views/student-page', {
    Form: "Student Registration",
    Message: "Enter Information Below",
    error_message: "Welcome",
  })
})

app.post("/student/add", function(req, res) {
  let input = req.body;
  controller.addStudent(input.first_name, input.last_name, input.email)
  .then(() => {
    res.redirect('/student')
  })
  .catch((err) => {
    res.render('../views/student-page', {
      Form: "Student Registration",
      Message: "Enter Information Below",
      error_message: err.message,
    })
  })
})

app.get("/student/edit/:id", function(req, res) {
  res.render('../views/student-edit-page', {
    id: req.params.id,
    Form: "Student Edit",
    Message: "Leave unchanged information form blank"
  })
})

app.post("/student/edit/:id", function(req, res) {
  let input = req.body;
  // console.log(req.params.id);
  // console.log(input);
  controller.editStudent(req.params.id, input.first_name, input.last_name, input.email)
  .then(() => {
    res.redirect('/student');
  })
  .catch((err) => {
    res.send(err.msg)
  })
})

app.get("/student/delete/:id", function(req, res) {
  // console.log(req.params);
  res.render('../views/student-delete-page', {
    id: req.params.id,
    Form: "Student Removal",
    Message: "Requires Confirmation"
  })
})

app.post("/student/delete/:id", function(req, res) {
  let input = req.body;
  if (input.confirm === '') {
    controller.deleteStudent(req.params.id)
  }
  res.redirect('/student')
})

app.get("/student/:id/add-subject", function(req, res) {
  controller.findById(req.params.id)
    .then(studentData => {
      // console.log(studentData[5].Subjects[0].subject_name)
      subject.showAllData()
      .then((subjectData) => {
        res.render('../views/student-add-subject-page', {
          id: req.params.id,
          Form: "Student Add Subject",
          Message: "Please Choose a Subject",
          data: studentData,
          subjects: subjectData,
        })
      })
    })
    .catch(err => {
      res.send(err);
    })
  // res.end();
})

app.post("/student/:id/add-subject", function(req, res) {
  let input = req.body;
  controller.addTeacher(input.first_name, input.last_name, input.email, input.SubjectId)
  .then(() => {
    res.redirect('/teacher')
  })
  .catch((err) => {
    res.render('../views/teacher-page', {
      Form: "Teacher Registration",
      Message: "Enter Information Below",
      error_message: err.message
    })
  })
})


module.exports = app;
