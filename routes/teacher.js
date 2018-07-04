var express = require('express')
var router = express.Router()
var models = require('../models')

router.get('/', function(req,res){
    models.Teacher.findAll({
        include: [models.Subject]
    })
    .then(teachers => {
        res.render('teachers.ejs', {teachers: teachers})
    })
})

router.get('/add', function(req, res){
    res.render('new_teacher.ejs', {error: null})
})

router.post('/', function(req, res){
    models.Teacher.create({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email
    })
    .then(function(){
        res.redirect('/teachers')
    })
    .catch(function(err){
        let inputdata = {first_name: req.body.first_name, last_name: req.body.last_name,email: req.body.email}
        res.render('new_teacher.ejs', {inputData: inputdata, error: err.message})
    })

})

router.get('/edit/:id', function(req,res){
    models.Teacher.findById(req.params.id)
    .then(teacher=>{
        res.render('teacher_edit.ejs',{teacher:teacher})
    })
})

router.post('/edit/:id',function(req,res){
    models.Teacher.update({
        first_name:req.body.first_name,
        last_name:req.body.last_name,
        email:req.body.email
    },{
        where : {id:req.params.id}
    })
    .then(teacher=>{
        res.redirect('/teachers')        
    })
    .catch(err=>{
        res.send(err.message)
    })
})


router.get('/delete/:id',function(req,res){
    models.Teacher.destroy({
            where:{id:req.params.id}
        })
        .then(teacher=>{
            res.redirect('/teachers')
        })
        .catch(err=>{
            res.send(err.message);
    })
})

module.exports = router