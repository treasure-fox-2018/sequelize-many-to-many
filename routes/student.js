const routes = require("express").Router();
const models = require("../models");
const Students = models.Student;
const Subjects = models.Subject;
const StudentSubjects = models.StudentSubject;

routes.get("/", (req, res) => {
  Students.findAll({
    include: [models.Subject]
  })
  .then(dataStudent => {
    res.render("data_student", { dataStudent: dataStudent, error: null });
    // res.send(dataStudent)
  })
  .catch(err => {
    Students.findAll({
      include: [models.Subject]
    })
    .then(dataStudent => {
      res.render("data_student", { dataStudent: dataStudent, error: err.message });
    })
  });
});

routes.get("/:id/add-subject", (req, res) => {
  Students.findById(req.params.id)
    .then(studentAddSubject => {
      Subjects.findAll().then(subjects => {
        res.render("add_subject", {
          studentAddSubject: studentAddSubject,
          subjects: subjects,
          error: null
        });
      });
    })
    .catch(err => {
      res.render("add_subject", { error: err.message });
    });
});

routes.post("/:id/add-subject/", (req, res) => {
  let request = req.body
  StudentSubjects.create({
    StudentId: req.params.id,
    SubjectId: request.subject_id
  })
  .then(subjectNameById => {
   //res.render('data_student', {subject: subjectNameById});
    Subjects.findOne({
      where: {
        id: subjectNameById.SubjectId
      }
    })
    .then(subjectName => {
      //res.send(subjectName.subject_name)
      Students.findAll({
        include: [models.Subject]
      })
      .then(dataStudent => {
        res.render("data_student", { dataStudent: dataStudent });
      })
      //res.render('data_student', {dataStudent: subjectName});
    })
    .catch(err => {
      
    })
   
  })
});


module.exports = routes;
