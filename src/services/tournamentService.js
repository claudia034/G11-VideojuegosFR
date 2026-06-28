import api from './axiosClient'

const delay = (ms) => new Promise((res) => setTimeout(res, ms))

export const tournamentService = {
  list: async () => {
    const response = await api.get('/tournaments');
    return response.data.data;
  },
getById: async (id) => {
    const response = await api.get(`/tournaments/${id}`);
    return response.data.data;
  },
  getMatches: async (tournamentId) => {
    const response = await api.get(`/tournaments/${tournamentId}/matches`);
    return response.data.data;
  },
  create: async (data) => {
    return await api.post('/tournaments', data);
  },
  getBracketView: async (tournamentId) => {
    try {
      const response = await api.get(`/tournaments/${tournamentId}/brackets/view`);
      return response.data.data;
    }
    catch (error) {
      console.error("Error al obtener el bracket", error);
      return null
    }
  }
}


