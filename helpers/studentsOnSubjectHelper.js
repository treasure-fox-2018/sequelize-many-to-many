function studentsOfSubjectHelper(studentsOnSubjectRawData) {
  if (studentsOnSubjectRawData.Students.length === 0) {
    return null
  } else {
    var arrStudentsFullName = []
    for (var i = 0; i < studentsOnSubjectRawData.Students.length; i++) {
      let fullName = studentsOnSubjectRawData.Students[i].first_name + " " + studentsOnSubjectRawData.Students[i].last_name;
      arrStudentsFullName.push(fullName)
    }
    return arrStudentsFullName;
  }
}

module.exports = studentsOfSubjectHelper;
