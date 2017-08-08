const express = require('express')
const path = require('path')
const logger = require('morgan')
const _ = require('lodash')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const autoIncrement = require('mongoose-auto-increment')
mongoose.Promise = global.Promise
const connection = mongoose.connect('mongodb://localhost/battleship', { useMongoClient: true })
autoIncrement.initialize(connection)
const index = require('./routes/index')

const app = express()

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))


app.use('/', index)
app.use('/games', require('./routes/games'))
app.use('/deploy', require('./routes/deploy'))
app.use('/attack', require('./routes/attack'))


app.get('/ships', (req, res) => {
  res.json(game.players.defender.ships)
})

app.use((req, res, next) => {
  const err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}
  res.status(err.status || 500)
  if (req.headers['content-type'] && req.headers['content-type'].search('json') > -1) {
    return res.json({ error: err.message })
  } 
  res.render('error')
})

module.exports = app
