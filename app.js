const express = require('express')
const app = express()
const router = require('./routers')

app.use(express.urlencoded( { extended:false } ))
app.use('/', router)
app.set('view engine', 'ejs')
app.listen(3000, function(){
    console.log('Listening to app 3000')
})
