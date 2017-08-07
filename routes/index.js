const express = require('express')
const router = express.Router()
const Game = require('../models/game')


router.get('/grids/:gameId', function(req, res, next) {
  Game.findOne({ gameId: req.params.gameId }, (error, game) => {
    if (error) {
      return re.status(400).json({ error })
    }

    res.render('index', { game })
  })
})

module.exports = router
