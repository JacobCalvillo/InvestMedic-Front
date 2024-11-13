import { axiosInstance } from "./axios.config"
import { User } from "../models/User"

const login = async (email: string, password: string) => {
    try {
        const response = await axiosInstance.post('/login', { 
            email: email,
            password: password
        })


        return response.data.data || null;
    } catch (error) {
        console.error("Error during login:", error);
        return null;
    }
}   

const register = async (user: User) => {
    try {
        const response = await axiosInstance.post('/register', { user });
        console.log("Response data:", response.data); // Verifica la estructura de respuesta

        if (!response.data) {
            return null;
        }

        return response.data.data || null;
    } catch (error) {
        console.error("Error during registration:", error);
        return null;
    }
}

export { login, register };