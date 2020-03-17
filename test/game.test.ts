import { expect } from 'chai'
import { Game } from '../src'

describe('Game.create(players)', () => {
  const players = [
    { id: 'alice' },
    { id: 'bob' },
    { id: 'charles' },
    { id: 'eve' },
  ]
  it('initializes a Game object', () => {
    // When
    const actual = Game.create(players)
    // Then
    expect(actual).to.be.an('object')
  })
  context('when just initialized', () => {
    let game: Game
    beforeEach(() => {
      game = Game.create(players)
    })
    describe('Game.currentScores()', () => {
      it('returns 0 for every player', () => {
        const expected = players.map((player) => ({
          player, score: 0
        }))
        const actual = Game.currentScores(game)
        expect(actual).to.deep.equal(expected)
      })
    })
    describe('Game.dealer()', () => {
      it('returns the first player', () => {
        const actual = Game.dealer(game)
        expect(actual).to.deep.equal(players[0])
      })
    })
    describe('Game.currentPlayer()', () => {
      it('returns the first player', () => {
        expect(Game.currentPlayer(game)).to.deep.equal(players[0])
      })
    })
    describe('Game.previousPlayer()', () => {
      it('returns null', () => {
        expect(Game.previousPlayer(game)).to.equal(null)
      })
    })
  })
})
