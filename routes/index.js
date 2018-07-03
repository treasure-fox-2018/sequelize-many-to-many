const router = require('express').Router()



router.use('/', (req, res)=> {
    res.send('connected with routes')
})


module.exports = router