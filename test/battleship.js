const assert = require('assert')
const async = require('async')
const expect = require('chai').expect
const app = require('../app')
const battleship = require('../battleship')

describe('Battleship lib', () => {
  describe('#createGame()', () => {
    it('should return game info', (done) => {
      battleship.createGame((error, game) => {
        expect(error).not.exist
        expect(game.gameId).to.be.a('number')
        expect(game.attacker).deep.equal({
          hitGrids: [],
          missGrids: []
        })
        done()
      })
    })
  })

  describe('#deploy()', () => {
    it('should return error when ship is not exist', (done) => {
      battleship.createGame((error, game) => {
        expect(error).not.exist
        const options = {
          row: 1,
          column: 1,
          ship: 'noship'
        }
        battleship.deploy(game.gameId, options, (deployError, game) => {
          expect(deployError).exist
          expect(deployError.message).eql('noship is not exist')
          done()
        })
      })
    })

    it('should return error when do not have ship', (done) => {
      battleship.createGame((error, game) => {
        expect(error).not.exist
        const options = [
          {
            row: 1,
            column: 1,
            ship: 'battleship'
          },
          {
            row: 6,
            column: 6,
            ship: 'battleship'
          }
        ]
        bulkDeploy(game.gameId, options, (error, result) => {
          expect(error).exist
          expect(error.message).eql('no more battleship ship')
          done()
        })
      })
    })

    // view test/all-deployed.png
    it('should return error when all ships have been deployed', (done) => {
      battleship.createGame((error, game) => {
        expect(error).not.exist
        const options = [
          {
            row: 1,
            column: 1,
            ship: 'battleship'
          },
          {
            row: 1,
            column: 6,
            ship: 'cruiser',
            isVertical: true
          },
          {
            row: 1,
            column: 10,
            ship: 'cruiser',
            isVertical: true
          },
          {
            row: 5,
            column: 1,
            ship: 'destroyer',
            isVertical: true
          },
          {
            row: 10,
            column: 1,
            ship: 'destroyer',
          },
          {
            row: 10,
            column: 9,
            ship: 'destroyer',
          },
          {
            row: 6,
            column: 5,
            ship: 'submarine',
          },
          {
            row: 6,
            column: 7,
            ship: 'submarine',
          },
          {
            row: 5,
            column: 10,
            ship: 'submarine',
          },
          {
            row: 7,
            column: 9,
            ship: 'submarine',
          },
          {
            row: 8,
            column: 6,
            ship: 'submarine',
          }
        ]
        bulkDeploy(game.gameId, options, (error, result) => {
          expect(error).exist
          expect(error.message).eql('all ships has been deployed')
          done()
        })
      })
    })
  })
})

function bulkDeploy(gameId, arr, callback) {
  async.eachSeries(arr, (options, done) => {
    battleship.deploy(gameId, options, done)
  }, callback)
}