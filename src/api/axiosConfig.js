import axios from 'axios';

// No usar baseURL para que Vite use el proxy configurado
const api = axios.create({
    baseURL: '',
});

// Esto intercepta todas las peticiones y les pega el token si existe
api.interceptors.request.use(
    (config) => {
        let token = localStorage.getItem('token');
        if (typeof token === 'string') {
            // limpiar comillas, saltos de línea y espacios accidentales
            token = token.replace(/^\s+|\s+$/g, '');
            token = token.replace(/^"|"$/g, '');
            token = token.replace(/\r|\n/g, '');
        }
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