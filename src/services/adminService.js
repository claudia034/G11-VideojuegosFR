import api from './axiosClient';
export const adminService = {
  getProfile: async () => {
    const response = await api.get('/auth/me');
    return response.data.data;
  }
};