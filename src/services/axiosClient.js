import axios from 'axios';

const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api/v1`,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('nexus-access-token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response, 
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem('nexus-refresh-token');
        if (!refreshToken) {
          throw new Error('No hay refresh token, requiere login manual.');
        }

        const response = await axios.post(
          `${api.defaults.baseURL}/auth/refresh`,
          { refreshToken: refreshToken } 
        );

        const { accessToken, refreshToken: newRefreshToken } = response.data.data;

        localStorage.setItem('nexus-access-token', accessToken);
        localStorage.setItem('nexus-refresh-token', newRefreshToken);

        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return api(originalRequest);

      } catch (refreshError) {
        localStorage.removeItem('nexus-access-token');
        localStorage.removeItem('nexus-refresh-token');
        localStorage.removeItem('nexus-user-id');
        localStorage.removeItem('nexus-role');
        
        window.location.href = '/login'; 
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;