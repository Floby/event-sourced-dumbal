import clone from 'clone-deep'

export interface Game {
  __dumbal_game: void
  players: Game.Player[]
}

export namespace Game {
  export interface Player { id: string }

  export function create (players: Game.Player[]): Game {
    return {
      players
    } as Game
  }

  export function currentScores (game: Game): Game.Scores {
    return game.players.map((player) => ({
      player,
      score: 0 as Game.Score
    }))
  }

  export function dealer(game: Game): Game.Player {
    return clone(game.players[0])
  }

  export function currentPlayer (game: Game): Game.Player {
    return clone(game.players[0])
  }
  export function previousPlayer (game: Game): null {
    if(game) return null
    else return null
  }

  export type Scores = Array<{
    player: Game.Player
    score: Game.Score
  }>

  export type Score = number & { __int_gte_0: void }
  export namespace Score {
    export function isScore (n: number): n is Score {
      return Math.floor(n) === n && n >= 0
    }
  }
}
