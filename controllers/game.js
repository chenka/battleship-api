const battleship = require('../battleship')
module.exports = {
  createGame(req, res) {
    battleship.createGame((error, game) => {
      if (error) return res.status(400).json({ error: error.message })
      res.json(game)
    })
  },
  deploy(req, res) {
    battleship.deploy(req.params.gameId, req.body, (error, game) => {
      if (error) return res.status(400).json({ error: error.message })
      res.json(game)
    })
  },
  attack(req, res) {
    battleship.attack(req.params.gameId, req.body, (error, message) => {
      if (error) return res.status(400).json({ error: error.message })
      res.json({ message })
    })
  }
}