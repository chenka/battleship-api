const axios = require('axios')
const async = require('async')
const instance = axios.create({
  baseURL: 'http://localhost:3000/'
})

async function main() {
  console.log('==== Start Game ===')
  try {
    const response = await instance.post('/games')
    const gameId = response.data.gameId
    await bulkDeploy(response.data.gameId)
    await bulkAttack(response.data.gameId)
    console.log(`Visit simulation result at http://localhost:3000/grids/${gameId}`)
  } catch (error) {
    console.error(error,'<<<<<<<<<<<')
  }
}

main()

function bulkDeploy(gameId, callback) {
  const arr = [
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
    }
  ]

  return new Promise((resolve, reject) => {
    async.eachSeries(arr, (options, done) => {
      console.log(`deploy: deployed ${options.ship} to row: ${options.row}, column: ${options.column}`)
      instance.post(`/deploy/${gameId}`, options)
        .then(() => done())
        .catch(done)
    }, (error) => {
      if (error) return reject(error)
      resolve(error)
    })
  })
}

function bulkAttack(gameId, callback) {
    const arr = [
      [1, 1],
      [1, 2],
      [1, 3],
      [1, 4],
      [9, 10],
      [1, 6],
      [1, 8],
      [1, 8],
      [2, 6],
      [2, 8],
      [3, 6],
      [1, 10],
      [2, 10],
      [3, 10],
      [5, 1],
      [6, 1],
      [10, 1],
      [10, 2],
      [7, 3],
      [10, 9],
      [10, 10],
      [9, 5],
      [5, 10],
      [6, 5],
      [6, 7],
      [7, 9]
    ]

  return new Promise((resolve, reject) => {
    async.eachSeries(arr, (options, done) => {
      const row = options[0]
      const column = options[1]
      console.log(`attack: row: ${row} col: ${column}`)
      instance.post(`/attack/${gameId}`, {
        row,
        column
      })
        .then((response) => {
          result = response.data.message
          console.log(`attack: ${result}`)
          done()
        })
        .catch(done)
    }, (error) => {
      if (error) return reject(error)
      resolve()
    })
  })
}