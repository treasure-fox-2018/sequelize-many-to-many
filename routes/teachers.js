const app = require('express').Router();
const ejs = require('ejs');
const controller = require('../controller/teachers');
const subject = require('../controller/subjects');

app.get('/teacher', (req, res) => {
  controller.showAllData()
    .then(teacherData => {
      // console.log(teacherData[1].Subject.subject_name);
      res.render('../views/teacher-dashboard', {
        data: teacherData
      })
    })
    .catch(err => {
      res.send(err);
    })
  // res.end();
})

app.get("/teacher/add", function(req, res) {
  subject.showAllData()
  .then((subjectData) => {
    // console.log(subjectData);
    res.render('../views/teacher-page', {
      Form: "Teacher Registration",
      Message: "Enter Information Below",
      error_message: "Welcome",
      subjects: subjectData,
    })
  })
})

app.post("/teacher/add", function(req, res) {
  let input = req.body;
  // console.log(input);
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

app.get("/teacher/edit/:id", function(req, res) {
  subject.showAllData()
  .then((subjectData) => {
    res.render('../views/teacher-edit-page', {
      id: req.params.id,
      Form: "Teacher Edit",
      Message: "Leave unchanged information form blank",
      subjects: subjectData,
    })
  })
})

app.post("/teacher/edit/:id", function(req, res) {
  let input = req.body;
  controller.editTeacher(req.params.id, input.first_name, input.last_name, input.email, input.SubjectId)
  .then(() => {
    res.redirect('/teacher');
  })
  .catch((err) => {
    res.send(err)
  })
})

app.get("/teacher/delete/:id", function(req, res) {
  res.render('../views/teacher-delete-page', {
    id: req.params.id,
    Form: "Teacher Removal",
    Message: "Requires Confirmation"
  })
})

app.post("/teacher/delete/:id", function(req, res) {
  let input = req.body;
  if (input.confirm === '') {
    controller.deleteTeacher(req.params.id)
  }
  res.redirect('/teacher')
})

module.exports = app;
