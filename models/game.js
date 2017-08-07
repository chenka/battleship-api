const mongoose = require('mongoose')
const Schema = mongoose.Schema
autoIncrement = require('mongoose-auto-increment')

const gameSchema = new Schema({
  gameId: {
    type: Number,
    unique: true
  },
  size: {
    type: Number,
    default: 10
  },
  adjacentGrids: {
    type: Array,
    default: []
  },
  occupyGrids: {
    type: Array,
    default: []
  },
  defender: {
    type: Object,
    default: {}
  },
  attacker: {
    type: Object,
    default: {}
  }
}, {
  versionKey: false
})

gameSchema.plugin(autoIncrement.plugin, { model: 'game', field: 'gameId', startAt: 1 })


const Game = mongoose.model('game', gameSchema)


module.exports = Game
