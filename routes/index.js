// app.get('/', (req, res) => {
//   models.Student({
//     include: models.StudentSubject
//   })
//     .then(() => {
//       [
//         Student {
//           id: ...
//           name: ...,
//           Subject: {

//             ...
//             ...
//             ..
//           }
//         }
//       ]
//     })
// })

const routes = require('express').Router()

routes.get('/', (req, res) => {
  res.render('index')
})

module.exports = routes