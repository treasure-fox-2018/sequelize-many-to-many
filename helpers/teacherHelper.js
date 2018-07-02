function teacherSubject(teacher_data) {
    if (teacher_data.Subject === null) {
      return "Unassigned";
    } else {
      return teacher_data.Subject.subject_name;
    }
}

module.exports = teacherSubject;
