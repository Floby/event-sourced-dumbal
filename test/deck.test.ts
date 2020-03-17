import { Integer } from '../src/types'
import { expect } from 'chai'
import { Deck } from '../src/deck'

describe('Deck.create()', () => {
  let deck: Deck
  beforeEach(() => {
    deck = Deck.create()
  })
  it('initializes a 52 distincts cards deck', () => {
    const index: { [key: string]: true } = {}
    for (const card of Deck.cardsToPick(deck)) {
      index[`${card.color}-${card.value}`] = true
    }
    expect(Object.keys(index)).to.have.length(52)
  })
  it('shuffles the cards', () => {
    const picked = Deck.cardsToPick(deck).slice(0, 10)
    const colors = picked.reduce((colors, card) => ({...colors, [card.color]: true}), {})
    expect(Object.keys(colors).length).to.be.greaterThan(1)
  })

  describe('deal(deck, nHands)', () => {
    it('removes nHands×7 cards from the cards to pick', () => {
      deck = Deck.deal(deck, Integer(4))
      expect(Deck.cardsToPick(deck)).to.have.length(52 - (4*7))
    })
    it('creates nHands hands with 7 cards in each', () => {
      deck = Deck.deal(deck, Integer(4))
      expect(Deck.hand(deck, 0)).to.have.length(7)
      expect(Deck.hand(deck, 1)).to.have.length(7)
      expect(Deck.hand(deck, 2)).to.have.length(7)
      expect(Deck.hand(deck, 3)).to.have.length(7)
      expect(() => Deck.hand(deck, 4)).to.throw(Error)
      console.log('hands', deck.hands)

    })
  })
})
