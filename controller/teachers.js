const models = require('../models');
const Sequelize = require('Sequelize');
const subject = require('./subjects');


class teachersController {
  static showAllData() {
    return models.Teacher.findAll({
      order: [
        ["id", "ASC"]
      ],
      include: [models.Subject],
      // raw: true
    });
  }

  static addTeacher(first_name, last_name, email, SubjectId) {
    return models.Teacher.create({
      first_name: first_name,
      last_name: last_name,
      email: email,
      SubjectId: SubjectId,
    });
  }

  static deleteTeacher(teacherID) {
    return models.Teacher.destroy({
      where: {
        id: teacherID,
      }
    });
  }

  static findById(teacherId) {
    return models.Teacher.findById(Number(teacherId))
  }

  static editTeacher(req, res) {
    const input = req.body;
    const id = req.params.id;
    models.Teacher.findById(Number(id), {
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
        if (input.SubjectId === '') {
          var processed_SubjectId = data.SubjectId;
        } else {
          var processed_SubjectId = input.SubjectId
        }
        models.Teacher.update({
            id: id,
            first_name: processed_first_name,
            last_name: processed_last_name,
            email: processed_email,
            SubjectId: processed_SubjectId,
          }, {
            where: {
              id: `${id}`
            }
          })
          .then(function() {
            res.redirect('/teacher');
          })
          .catch((err) => {
            subject.showAllData()
              .then((subjectData) => {
                teachersController.findById(req.params.id)
                  .then((teacherData) => {
                    res.render('../views/teacher-edit-page', {
                      id: req.params.id,
                      Form: "Teacher Edit",
                      Message: "Leave unchanged information form blank",
                      subjects: subjectData,
                      first_name: teacherData.first_name,
                      last_name: teacherData.last_name,
                      email: teacherData.email,
                      error_message: err.message,
                    })
                  })
              })
          })
      })
  }
}

module.exports = teachersController;
