import { axiosInstance } from "./axios.config"
import { User } from "../models/User"

const login = async (email: string, password: string) => {
    try {

        const response = await axiosInstance.post('/login/user', {
            email: email,
            password: password
        })
        return response.data || null;
    } catch (error) {
        console.error("Error during login:", error);
        return null;
    }
}

const register = async (user: User) => {
    try {
        const response = await axiosInstance.post('/register/user', user);

        return response.data || null;
    } catch (error) {
        console.error("Error during register:", error);
        return null;
    }
};


const getUsers = async() : Promise<User[]> => {
    try {
        const response = await axiosInstance.get('/users');
        return response.data || null;
    } catch (error) {
        console.error("Error during login:", error);
        return [];
    }
}

export { login, register, getUsers };