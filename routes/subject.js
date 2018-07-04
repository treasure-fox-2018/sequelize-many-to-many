const router = require('express').Router()
const models = require('../models')
const Subject = models.Subject
const Teacher = models.Teacher
const Student = models.Student
// router.use('/', (req, res) => {

// })
router.get('/', (req, res) => {
    // res.send('connected')
    Subject.findAll({
        include: [Teacher]
    })
    .then(subjects => {
        // res.send(`${subjects[0].Teachers[0].fullName}  ${subjects[0].Teachers[0].lastName}`)
        res.render('subjects.ejs', {subjects:subjects})
    })
})

router.get('/:id/enrolled-students', (req, res) => {
    let idSubject = req.params.id
    Subject.findById(idSubject , {
        include: [Student],
    })
    .then(data => {
        // res.send(data)
        res.render('enrolled-students.ejs', {data:data})
    })
})

module.exports = router