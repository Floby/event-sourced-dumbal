import { Integer } from './types'

export interface Deck {
  __cards_deck: void
  toPick: Deck.Card[]
  hands: Deck.Card[][]
}

export namespace Deck {
  export function create (): Deck {
    const toPick: Deck.Card[] = []
    for (const color of '♦♣♥♠') {
      for (const value of [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K']) {
        toPick.push({
          color: color as Card.Color,
          value: value as Card.Value
        })
      }
    }
    return {
      __cards_deck: undefined,
      toPick: shuffle(toPick),
      hands: []
    }
  }
  export function cardsToPick (deck: Deck): Array<Deck.Card> {
    return [...deck.toPick]
  }
  export function deal(deck: Deck, nHands: Integer): Deck {
    const nCardsToDeal = nHands * 7
    let handCards = deck.toPick.slice(0, nCardsToDeal)
    const hands: Card[][] = []
    for (let i=0; i<nHands; ++i) {
      hands.push(handCards.slice(0, 7))
      handCards = handCards.slice(7)
    }
    const toPick = deck.toPick.slice(nCardsToDeal)
    return { ...deck, toPick, hands }
  }
  export function hand(deck: Deck, i: number): Card[] {
    if (!deck.hands[i]) {
      throw Error('There is no such hand')
    }
    return [...deck.hands[i]]
  }

  export interface Card {
    readonly color: Card.Color
    readonly value: Card.Value
  }

  export namespace Card {
    export type Color = '♦' | '♣' | '♥' | '♠'
    export type Value = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 'J' | 'Q' | 'K'
  }
}

function shuffle<T> (a: T[]): T[] {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ; [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}
