function scoreOfStudent(studentSubjectsData, studentId, subjectId) {
  for (var i = 0; i < studentSubjectsData.length; i++) {
    if (studentSubjectsData[i].StudentId === Number(studentId) && studentSubjectsData[i].SubjectId === Number(subjectId)) {
      return studentSubjectsData[i].score;
    }
  }
}

module.exports = scoreOfStudent;
