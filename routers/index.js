const express = require('express')
const router = express()
const model = require('../models')

router.get('/', function(req, res){
    res.send('yuuuhuuuu!!')
})

module.exports = router