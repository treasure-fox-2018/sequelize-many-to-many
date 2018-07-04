const router = require('express').Router()
const models = require('../models')
const Students = models.Student
const Subject = models.Subject
const StudentSubject = models.StudentSubject

router.get('/', (req, res) => {
    // console.log(Students);
    Students.findAll({
        order: [
            ['id', 'ASC']
        ]
    }) 
    .then(Students => {
        // res.send(Students)
        res.render('students.ejs', {students:Students})
    })
})

router.get('/:id/add-subject', (req, res) => {
    let idStudent = req.params.id
    Students.findById(idStudent)
    .then(dataStudent => {
        Subject.findAll()
        .then(dataSubjects => {
            res.render('add-subject.ejs', {dataSubjects:dataSubjects, dataStudent:dataStudent})
        })
    })
})

router.post('/:id/add-subject', (req, res) => {
    let idStudent = req.params.id
    // console.log('=====', idStudent);
    
    StudentSubject.create({
        StudentId: idStudent,
        SubjectId: req.body.SubjectId
    })
    .then(() => {
        res.redirect('/students')
    })
})

module.exports = router