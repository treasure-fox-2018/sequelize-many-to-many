const routes = require ('express').Router();
const student = require('../controllers/student');
const teacher = require('../controllers/teacher');
const subject = require('../controllers/subject');

//STUDENT
routes.get('/', (req, res) => {
  res.render('home')
})

routes.get('/students/', (req, res) => {
  student.showAll()
  .then( students => {
    res.render('students-data', {students: students})
  })
  .catch( err => {
    res.send(err.message)
  })
})

routes.get('/students/add', (req, res) => {
  res.render('students-add', {errMsg: null})
})

routes.post('/students/add', (req, res) => {
  let studentObj = {
    first_name : req.body.first_name,
    last_name : req.body.last_name,
    email : req.body.email
  }
  student.add(studentObj)
  .then(()=> {
    res.redirect('/students')
  })
  .catch(err => {
    res.render('students-add', {errMsg: err.message})
  })
})

routes.get('/students/edit/:id', (req, res) => {
  student.findById(req.params.id)
  .then((student) => {
    res.render('student-edit', {student: student})
  })
  .catch(err => {
    res.send(err.message)
  })
})

routes.post('/students/edit/:id', (req, res) => {
  let studentObj = {
    first_name : req.body.first_name,
    last_name : req.body.last_name,
    email : req.body.email
  }
  student.update(studentObj, req.params.id)
  .then(() => {
    res.redirect('/students')
  })
  .catch(err => {
    res.send(err.message)
  })
})

routes.get('/students/delete/:id', (req, res)=> {
  student.delete(req.params.id)
  .then(()=> {
    res.redirect('/students')
  })
  .catch(err => {
    res.send(err.message)
  })
})


//TEACHER
routes.get('/teachers/', (req, res) => {
  teacher.showAll()
  .then( teachers => {
    res.render('teachers-data', {teachers: teachers})
  })
  .catch( err => {
    res.send(err.message)
  })
})

routes.get('/teachers/add', (req, res) => {
  res.render('teachers-add', {errMsg: null})
})

routes.post('/teachers/add', (req, res) => {
  let teacherObj = {
    first_name : req.body.first_name,
    last_name : req.body.last_name,
    email : req.body.email
  }
  teacher.add(teacherObj)
  .then(()=> {
    res.redirect('/teachers')
  })
  .catch( err => {
    res.render('teachers-add', {errMsg: err.message})
  })
})

routes.get('/teachers/edit/:id', (req, res) => {
  teacher.findById(req.params.id)
  .then((teacher) => {
    res.render('teacher-edit', {teacher: teacher})
  })
  .catch(err => {
    res.send(err.message)
  })
})

routes.post('/teachers/edit/:id', (req, res) => {
  let tacherObj = {
    first_name : req.body.first_name,
    last_name : req.body.last_name,
    email : req.body.email
  }
  teacher.update(teacherObj, req.params.id)
  .then(() => {
    res.redirect('/teachers')
  })
  .catch(err => {
    res.send(err.message)
  })
})

routes.get('/teachers/delete/:id', (req, res)=> {
  teacher.delete(req.params.id)
  .then(()=> {
    res.redirect('/teachers')
  })
  .catch(err => {
    res.send(err.message)
  })
})

//SUBJECT
routes.get('/subjects/', (req, res) => {
  subject.showAll()
  .then( subjects => {
    res.render('subjects-data', {subjects: subjects})
    console.log(subjects[0].Teachers[0].first_name)
  })
  .catch( err => {
    res.send(err.message)
  })
})

routes.get('/subjects/add', (req, res) => {
  res.render('subjects-add')
})

routes.post('/subjects/add', (req, res) => {
  let subjectObj = {
    subject_name : req.body.subject_name,
  }
  subject.add(subjectObj)
  .then(()=> {
    res.redirect('/subjects')
  })
  .catch( err => {
    res.send(err.message)
  })
})

routes.get('/subjects/edit/:id', (req, res) => {
  subject.findById(req.params.id)
  .then((subject) => {
    res.render('subject-edit', {subject: subject})
  })
  .catch(err => {
    res.send(err.message)
  })
})

routes.post('/subjects/edit/:id', (req, res) => {
  let subjectObj = {
    subject_name : req.body.subject_name,
  }
  subject.update(subjectObj, req.params.id)
  .then(() => {
    res.redirect('/subjects')
  })
  .catch(err => {
    res.send(err.message)
  })
})

routes.get('/subjects/delete/:id', (req, res)=> {
  subject.delete(req.params.id)
  .then(()=> {
    res.redirect('/subjects')
  })
  .catch(err => {
    res.send(err.message)
  })
})




module.exports = routes;