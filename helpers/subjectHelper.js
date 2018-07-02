function subject_helper(subjects_data) {
  if (subjects_data.Teachers.length === 0) {
    return ["Unassigned"];
  } else {
    var teacherNameContainer = [];
    for (var i = 0; i < subjects_data.Teachers.length; i++) {
      var fullName = ""
      fullName += (subjects_data.Teachers[i].first_name);
      fullName += " ";
      fullName += (subjects_data.Teachers[i].last_name);
      teacherNameContainer.push(fullName)
    }
  }
  console.log(teacherNameContainer);
  return teacherNameContainer;
}

module.exports = subject_helper;
