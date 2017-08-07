const express = require('express')
const router = express.Router()
const gameController = require('../controllers/game')

router.post('/:gameId', gameController.attack)

module.exports = router
