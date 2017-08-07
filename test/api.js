const request = require('supertest')
const expect = require('chai').expect
const app = require('../app')
const battleship = require('../battleship')

describe('POST /game', () => {
  it('should resonse 200 and created new game', (done) => {
    request(app)
      .post('/games')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done)
  })
})

describe('POST /deploy', () => {
  it('should response 200 and created new game', (done) => {
    battleship.createGame((error, game) => {
      expect(error).not.exist
      request(app)
        .post(`/deploy/${game.gameId}`)
        .send({
          row: 1,
          column: 1,
          ship: 'battleship'
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, done)
    })
  })
})

describe('POST /attack', () => {})