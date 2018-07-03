const router = require('express').Router()
const models = require('../models')
const Students = models.Student

router.get('/', (req, res) => {
    console.log(Students);
    
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

module.exports = router