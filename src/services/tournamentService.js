import { tournaments } from '../data/tournaments'
import { matches } from '../data/matches'

const delay = (ms) => new Promise((res) => setTimeout(res, ms))

export const tournamentService = {
  list: async () => {
    await delay(200)
    return tournaments
  },
  getById: async (id) => {
    await delay(150)
    return tournaments.find((t) => t.id === id)
  },
  getMatches: async (tournamentId) => {
    await delay(150)
    return matches.filter((m) => m.tournamentId === tournamentId)
  }
}
