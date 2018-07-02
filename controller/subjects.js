const models = require('../models');
const Sequelize = require('Sequelize');
const Op = Sequelize.Op;

class subjectsController {
  static showAllData() {
    return models.Subject.findAll({
      order: [
        ["id", "ASC"]
      ],
      include: [models.Teacher],
    });
  }

  static addSubject(subject_name) {
    return models.Subject.create({
      subject_name: subject_name,
    });
  }

  static deleteSubject(subjectID) {
    return models.Subject.destroy({
      where: {
        id: subjectID,
      }
    });
  }

  static editSubject(id, subject_name, last_name, email) {
    return (
      models.Subject.findById(Number(id), {
        raw: true
      }).then((data) => {
        // console.log([subject_name, last_name, email]);
        if (subject_name === '') {
          var processed_subject_name = data.subject_name;
        } else {
          var processed_subject_name = subject_name
        }

        // console.log(data);
        // console.log([processed_subject_name, processed_last_name, processed_email]);
        models.Subject.update({
          subject_name: processed_subject_name,
        }, {
          where: {
            id: `${id}`
          }
        })
      })
    )
  }
}

module.exports = subjectsController;
