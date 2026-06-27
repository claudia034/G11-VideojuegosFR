import api from './axiosClient';

export const playerService = {
  getRanking: async (page = 0) => {
    try {
      const response = await api.get(`/players/ranking?page=${page}&size=20`);
      return response.data.content || [];

    } catch (error) {
      console.error("Error obteniendo el ranking:", error);
      return [];
    }
  }
};