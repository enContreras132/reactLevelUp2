import axios from 'axios';

// URL del backend en Railway
const API_URL = import.meta.env.VITE_API_URL || 'https://levelupapi-production.up.railway.app';

const api = axios.create({
    baseURL: API_URL,
});

// Esto intercepta todas las peticiones y les pega el token si existe
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;