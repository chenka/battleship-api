const battleship = require('../battleship')
module.exports = {
  async createGame(req, res) {
    try {
      const game = await battleship.createGame()
      res.json(game)
    } catch (error) {  
      error.status = 400
      next(error)
    }
  },
  async deploy(req, res, next) {
    try {
      const game = await battleship.deploy(req.params.gameId, req.body)
      res.json(game)
    } catch (error) {
      error.status = 400
      next(error)
    }
  },
  async attack(req, res) {
    try {
      const message = await battleship.attack(req.params.gameId, req.body)
      res.json({ message })
    } catch (error) {
      error.status = 400
      next(error)
    }

  }
}