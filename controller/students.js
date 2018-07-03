const models = require('../models');
const Sequelize = require('Sequelize');
const subject = require("./subjects")

class studentsController {
  static showAllData() {
    return models.Student.findAll({
      order: [
        ["id", "ASC"]
      ],
    });
  }

  static findById(studentId) {
    return models.Student.findById(Number(studentId))
  }

  static addStudent(first_name, last_name, email) {
    return models.Student.create({
      first_name: first_name,
      last_name: last_name,
      email: email,
    });
  }

  static deleteStudent(studentID) {
    return models.Student.destroy({
      where: {
        id: studentID,
      }
    });
  }

  static editStudent(req, res) {
    const input = req.body;
    const id = req.params.id;
    models.Student.findById(Number(id), {
        raw: true
      })
      .then((data) => {
        // console.log([first_name, last_name, email]);
        if (input.first_name === '') {
          var processed_first_name = data.first_name;
        } else {
          var processed_first_name = input.first_name
        }
        if (input.last_name === '') {
          var processed_last_name = data.last_name;
        } else {
          var processed_last_name = input.last_name
        }
        if (input.email === '') {
          var processed_email = data.email;
        } else {
          var processed_email = input.email
        }
        // console.log(data);
        // console.log([processed_first_name, processed_last_name, processed_email]);
        models.Student.update({
            id: id,
            first_name: processed_first_name,
            last_name: processed_last_name,
            email: processed_email,
          }, {
            where: {
              id: `${id}`
            }
          })
          .then(() => {
            res.redirect("/student")
          })
          .catch((err) => {
            subject.showAllData()
              .then((subjectData) => {
                studentsController.findById(req.params.id)
                  .then((studentData) => {
                    res.render('../views/student-edit-page', {
                      id: req.params.id,
                      Form: "Subject Edit",
                      Message: "Leave unchanged information form blank",
                      subjects: subjectData,
                      first_name: studentData.first_name,
                      last_name: studentData.last_name,
                      email: studentData.email,
                      error_message: err.message,
                    })
                  })
              })
          })
      })
  }

}

module.exports = studentsController;
