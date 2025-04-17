// src/services/axios.config.ts
import axios from "axios";

const axiosInstance = axios.create({
    baseURL: `${import.meta.env.VITE_API_TEST_URL}/api/v1`,
});

// Interceptor para añadir el token a las solicitudes
axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
}, (error) => {
    return Promise.reject(error);
});

// Interceptor para manejar errores de respuesta
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response) {
            // Si recibimos un 401 Unauthorized, podemos redirigir al login
            if (error.response.status === 401) {
                localStorage.removeItem('token');
                window.location.href = '/login';
            }

            // Puedes manejar otros códigos de error según sea necesario

            return Promise.reject(error.response.data);
        }

        return Promise.reject(error);
    }
);

export { axiosInstance };