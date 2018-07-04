const router = require('express').Router()



router.use('/', (req, res)=> {
    // res.send('connected with routes')
    res.render('homepage.ejs')
})


module.exports = router