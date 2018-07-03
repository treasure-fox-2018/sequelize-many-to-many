const app = require('express').Router();
const ejs = require('ejs');
const controller = require('../controller/subjects');
const studentSubjects = require('../controller/studentSubjects');

app.get('/subject', (req, res) => {
  controller.showAllData()
    .then(subjectData => {
      // console.log(subjectData);
      res.render('../views/subject-dashboard', {
        data: subjectData
      })
    })
    .catch(err => {
      res.send(err);
    })
  // res.end();
})

app.get("/subject/add", function(req, res) {
  let input = req.body;
  res.render('../views/subject-page', {
    Form: "Subject Registration",
    Message: "Enter Information Below",
    error_message: "Welcome",
  })
})
//
app.post("/subject/add", function(req, res) {
  let input = req.body;
  controller.addSubject(input.subject_name)
    .then(() => {
      res.redirect('/subject')
    })
    .catch((err) => {
      res.render('../views/subject-page', {
        Form: "Subject Registration",
        Message: "Enter Information Below",
        error_message: err.message,
      })
    })
})

app.get("/subject/edit/:id", function(req, res) {
  res.render('../views/subject-edit-page', {
    id: req.params.id,
    Form: "Subject Edit",
    Message: "Leave unchanged information form blank"
  })
})

app.post("/subject/edit/:id", function(req, res) {
  let input = req.body;
  controller.editSubject(req.params.id, input.subject_name)
    .then(() => {
      res.redirect('/subject');
    })
    .catch((err) => {
      res.send(err)
    })
})

app.get("/subject/delete/:id", function(req, res) {
  res.render('../views/subject-delete-page', {
    id: req.params.id,
    Form: "Subject Removal",
    Message: "Requires Confirmation"
  })
})

app.post("/subject/delete/:id", function(req, res) {
  let input = req.body;
  if (input.confirm === '') {
    controller.deleteSubject(req.params.id)
  }
  res.redirect('/subject')
})

app.get("/subject/:id/enrolled-students", function(req, res) {
  controller.showStudent(req.params.id)
  .then((studentsOnSubjectRawData) => {
    controller.findById(req.params.id)
    .then((subjectData) => {
      studentSubjects.showAllData()
      .then((studentSubjectsData) => {
        // console.log(studentSubjectsData);
        res.render("enrolled-students-page", {
          error_message: "Welcome",
          subject_name: subjectData.subject_name,
          studentsOfSubject: studentsOnSubjectRawData,
          studentSubjects: studentSubjectsData,
          id: req.params.id,
        })
      })
    })
  })
})

app.post("/subject/:id/enrolled-students", function (req, res) {
  // console.log(req.params.id);
  let input = req.body
  let subjectId = req.params.id
  studentSubjects.addScore(input.scoreValue, input.studentId, subjectId)
  .then(() => {
    res.redirect("/subject")
  })
  .catch((err) => {
    controller.showStudent(req.params.id)
    .then((studentsOnSubjectRawData) => {
      controller.findById(req.params.id)
      .then((subjectData) => {
        studentSubjects.showAllData()
        .then((studentSubjectsData) => {
          // console.log(studentSubjectsData);
          res.render("enrolled-students-page", {
            error_message: err.message,
            subject_name: subjectData.subject_name,
            studentsOfSubject: studentsOnSubjectRawData,
            studentSubjects: studentSubjectsData,
            id: req.params.id,
          })
        })
      })
    })
  })
})

module.exports = app;
