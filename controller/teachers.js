const models = require('../models');
const Sequelize = require('Sequelize');
const Op = Sequelize.Op;

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

  static editTeacher(id, first_name, last_name, email, SubjectId) {
    return (
      models.Teacher.findById(Number(id), {
        raw: true
      }).then((data) => {
        // console.log([first_name, last_name, email]);
        if (first_name === '') {
          var processed_first_name = data.first_name;
        } else {
          var processed_first_name = first_name
        }
        if (last_name === '') {
          var processed_last_name = data.last_name;
        } else {
          var processed_last_name = last_name
        }
        if (email === '') {
          var processed_email = data.email;
        } else {
          var processed_email = email
        }
        if (SubjectId === '') {
          var processed_SubjectId = data.SubjectId;
        } else {
          var processed_SubjectId = SubjectId
        }
        // console.log(data);
        // console.log([processed_first_name, processed_last_name, processed_SubjectId]);
        models.Teacher.update({
          first_name: processed_first_name,
          last_name: processed_last_name,
          SubjectId: processed_SubjectId,
        }, {
          where: {
            id: `${id}`
          }
        })
      })
    )
  }
}

module.exports = teachersController;
