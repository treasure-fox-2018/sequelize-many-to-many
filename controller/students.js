const models = require('../models');
const Sequelize = require('Sequelize');
const Op = Sequelize.Op;

class studentsController {
  static showAllData() {
    return models.Student.findAll({
      order: [
        ["id", "ASC"]
      ]
    });
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

  static editStudent(id, first_name, last_name, email) {
    return (
      models.Student.findById(Number(id), {
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
        console.log(data);
        console.log([processed_first_name, processed_last_name, processed_email]);
        models.Student.update({
          first_name: processed_first_name,
          last_name: processed_last_name,
          email: processed_email,
        }, {
          where: {
            id: `${id}`
          }
        })
      })
    )
  }
}

module.exports = studentsController;
