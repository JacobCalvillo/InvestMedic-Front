import axios from "axios";

const axiosInstance = axios.create({
    baseURL: `${import.meta.env.VITE_API_TEST_URL}/api`,
})

axiosInstance.interceptors.request.use((config) => {
        return {
        ...config,
    };
},
    (error) => {
        let errorMessage = 'Ocurrió un error inesperado';
        const statusCode = error.response ? error.response.status : 500;

        if(error.response) {
            switch (error.response.status) {
                case 400:
                    errorMessage = 'Solicitud incorrecta';
                    break;
                case 401:
                    errorMessage = 'No autorizado. Inicia sesion de nuevo.';
                    break;
                case 403:
                    errorMessage = 'Prohibido';
                    break;
                case 404:
                    errorMessage = 'No encontrado';
                    break;
                case 500:
                    errorMessage = 'Error interno del servidor';
                    break;
                default:
                    errorMessage = error.response.data.message || errorMessage;
                    break;
            }
        } else if (error.request) {
            errorMessage = 'No responde el servidor';
        } else { 
            errorMessage = error.message;
        }

        return Promise.reject({
            errorMessage,
            statusCode,
            response: error.response ? error.response.data : null
        });
    });

export { axiosInstance }

