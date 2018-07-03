const express = require('express')
const router  = express.Router()
const model = require('../models')

router.get('/subject',function(req,res){
    model.Subject.findAll({
        // include: [model.Teacher]
    })
    .then((dataSubject) => {
        res.render('subject', {dataSubject: dataSubject})
    })
})

module.exports = router
