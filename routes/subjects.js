const app = require('express').Router();
const ejs = require('ejs');
const controller = require('../controller/subjects');

app.get('/subject', (req, res) => {
  controller.showAllData()
    .then(subjectData => {
      console.log(subjectData);
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
    Message: "Enter Information Below"
  })
})
//
app.post("/subject/add", function(req, res) {
  let input = req.body;
  controller.addSubject(input.subject_name)
  .then(() => {
    res.redirect('/subject')
  })
  .catch(err => {
    res.send(err);
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

module.exports = app;
