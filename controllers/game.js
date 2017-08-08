const battleship = require('../battleship')
module.exports = {
  async createGame(req, res) {
    try {
      const game = await battleship.createGame()
      res.json(game)
    } catch (error) {  
      res.status(400).json({ error: error.message })
    }
  },
  async deploy(req, res) {
    try {
      const game = await battleship.deploy(req.params.gameId, req.body)
      res.json(game)
    } catch (error) {
      res.status(400).json({ error: error.message })
    }
  },
  async attack(req, res) {
    try {
      const message = await battleship.attack(req.params.gameId, req.body)
      res.json({ message })
    } catch (error) {
      res.status(400).json({ error: error.message })
    }

  }
}