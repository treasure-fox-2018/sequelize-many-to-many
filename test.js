Student.belongsToMany(models.Subject, {
  through: 'StudentSubject'
})

Subject.belongsToMany(models.Student, {
  through: 'StudentSubject'
})

// on conjunction table
// --- Use this if you wanted to query data from conjunction table
StudentSubject.belongsTo(Student)
StudentSubject.belongsTo(Subject)