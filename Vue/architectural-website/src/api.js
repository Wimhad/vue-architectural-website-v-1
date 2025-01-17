import axios from 'axios';

// Создание экземпляра Axios с базовой конфигурацией
const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api',
    timeout: 10000,
});

// Обработчик запросов
apiClient.interceptors.request.use((config) => {
    // Например, добавление токена авторизации
    const token = localStorage.getItem('authToken');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Обработчик ошибок
apiClient.interceptors.response.use(
    response => response,
    error => {
        console.error('API Error:', error);
        return Promise.reject(error);
    }
);

// Обёртка API
export const api = {
    get: (url, params = {}) => apiClient.get(url, {params}),
    post: (url, data) => apiClient.post(url, data),
    put: (url, data) => apiClient.put(url, data),
    delete: (url) => apiClient.delete(url),
};