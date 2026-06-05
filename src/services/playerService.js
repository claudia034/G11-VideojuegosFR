import { players } from '../data/players'

const delay = (ms) => new Promise((res) => setTimeout(res, ms))

export const playerService = {
  list: async () => {
    await delay(120)
    return players
  },
  getById: async (id) => {
    await delay(100)
    return players.find((p) => p.id === id)
  }
}
