const _ = require('lodash')
const Game = require('./models/game')

module.exports = battleship =  {
  getGameInfo(gameId) {
    return Game.findOne({ gameId })
  },
  toGrid(row, column) {
    return (10 * (row - 1)) + column
  },
  isExceedGrids(row, column) {
    return column > 10 || 
      row > 10 ||
      column < 1  ||
      row < 1
  },
  createGame(callback) {
    const game = new Game()
    game.defender = {
      placements: [],
      ships: {
        battleship: {
        name: 'battleship',
        amount: 1,
        size: 4
        },
        cruiser: {
        name: 'cruiser',
        amount: 2,
        size: 3
        },
        destroyer: {
        name: 'destroyer',
        amount: 3,
        size: 2
        },
        submarine: {
        name: 'submarine',
        amount: 4,
        size: 1
        }
      }
    },
    game.attacker = {
      missGrids: [],
      hitGrids: []
    }
    return game.save(callback)
  },
  async deploy(gameId, options) {
    const game = await Game.findOne({ gameId })
    const row = options.row
    const column = options.column

    // check invalid ship
    if (!game.defender.ships[options.ship]) {
      return Promise.reject(new Error(`${options.ship} is not exist`))
    }

    const allDeploy = Object.keys(game.defender.ships).every((key) => {
      const ship = game.defender.ships[key]
      return ship.amount === 0
    })

    if (allDeploy) {
      return Promise.reject(new Error('all ships has been deployed'))
    }

    const gridsNumber = battleship.toGrid(row, column, game.size)
    
    if (game.occupyGrids.includes(gridsNumber)
        || game.adjacentGrids.includes(gridsNumber) ) {
      return Promise.reject(new Error(`column ${column} and row ${row} were occupied or adjacent`))
    }

    const ship = game.defender.ships[options.ship]
    if (ship.amount < 1) {
      return Promise.reject(new Error(`no more ${ship.name} ship`))
    }
    const rowMaxGrid = row * game.size
    const columnMaxGrid = (10*(game.size - 1)) + column
    const lastGrid = options.isVertical 
      ? gridsNumber + (10 * (ship.size-1))
      : gridsNumber + ship.size - 1

    if (options.isVertical) {
      if (lastGrid > columnMaxGrid) {
        return Promise.reject(new Error('exceed vertical grid'))
      }
    } else {
      if (lastGrid > rowMaxGrid) {
        return Promise.reject(new Error('exceed horizontal grid'))
      }
    }
    let placementGrid = {
      ship: ship.name,
      grids: []
    }

    for(let i=0; i<ship.size;i++) {
      let gridToPush
      if (options.isVertical) {
        gridToPush = gridsNumber + (10 * i)
      } else {
        gridToPush = gridsNumber + i
      }
      game.occupyGrids.push(gridToPush)
      placementGrid.grids.push(gridToPush)
    }
    game.defender.placements.push(placementGrid)

    let adjacentGrids = getAdjacent({
      row: row,
      column: column,
      ship: ship,
      isVertical: options.isVertical,
      size: game.size
    })

    // remove adjacent overlap with occypyGrids
    adjacentGrids = _.difference(adjacentGrids, game.occupyGrids)
    game.adjacentGrids = game.adjacentGrids.concat(adjacentGrids)
    ship.amount -= 1
    game.markModified('defender')
    return game.save()
  },
  async attack(gameId, options,) {
    let message
    const game = await Game.findOne({ gameId })
    const grid = battleship.toGrid(options.row, options.column)
    const attacker = game.attacker
    const defender = game.defender
    if (attacker.hitGrids.length === game.occupyGrids.length) {
      return Promise.resolve('game end')
    }
    if (attacker.missGrids.includes(grid) || attacker.hitGrids.includes(grid) ) {
      return Promise.resolve('already hit')
    }
    if (game.occupyGrids.includes(grid)) {
      message = 'Hit'
      attacker.hitGrids.push(grid)
      const found = _.find(defender.placements, (item) => {
        return item.grids.indexOf(grid) > -1
      })
      
      // remove grids was hit
      const index = found.grids.indexOf(grid)
      found.grids.splice(index, 1)
      if (found.grids.length === 0) {
        message = `You just sank the ${found.ship}`
      }

    } else {
      attacker.missGrids.push(grid)
      message = 'Miss'
    }
    
    if (attacker.hitGrids.length === game.occupyGrids.length) {
      const totalMoves = attacker.missGrids.length + attacker.hitGrids.length
      message = `Win ! You completed the game in ${totalMoves} moves. ${attacker.missGrids.length} missed shots`
    }
    game.markModified('defender')
    game.markModified('attacker')

    await game.save()
    return Promise.resolve(message)
  }
}


function getAdjacent(options) {
  let adj
  if (options.isVertical) {
    adj = verticalAdjacent(options)
  } else {
    adj = horizontalAdjacent(options)
  }
  return adj

}

function verticalAdjacent(options) {
    const count = options.ship.size + 2
    let _col
    let _row
    let adj = []
    for(let i=0;i<3;i++) {
      _col = options.column + i - 1
      for(let j=0;j<count;j++){
        _row = options.row + j - 1
        if (battleship.isExceedGrids(_row, _col)) {
          continue
        }
        adj.push(battleship.toGrid(_row, _col))
      }
    }
    return adj
}

function horizontalAdjacent(options) {
  const count = options.ship.size + 2
  let _col
  let _row
  let adj = []
  for(let i=0;i<3;i++) {
    _row = options.row + i - 1
    for(let j=0;j<count;j++){
      _col = options.column + j - 1
      if (battleship.isExceedGrids(_row, _col)) {
        continue
      }
      adj.push(battleship.toGrid(_row, _col))
    }
  }
  return adj
}