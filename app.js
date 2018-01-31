var express = require('express')
var app = express()
var router = require('./route')

app.use('/', router)

app.listen(3000, ()=> console.log('listening on port 3000'))