const express = require('express')
const app = express()
var fs = require('fs')
var morgan = require('morgan')
var path = require('path')
require('dotenv').config()

var authentication = require('./modules/auth.js')
var weather = require('./modules/weather.js')

const port = 3000

// create a write stream (in append mode)
var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })

// setup the logger
app.use(morgan('combined', { stream: accessLogStream }))

app.use(authentication)

// BASE ROUTE
app.get('/', (req, res) => {
  res.send('API weather...')
})

// WEATHER ROUTE
app.use('/weather', weather);

app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`)
})