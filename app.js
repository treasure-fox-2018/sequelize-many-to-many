'use strict'

const app = require('express')()
const routes = require('./routes')
const ejs = require('ejs')
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({extended:false}));

app.set('view engine', 'ejs')

app.use('/', routes)

app.listen(3000)
