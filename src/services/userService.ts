import { axiosInstance } from "../core/api/axios.config.ts"
import { User } from "../models/User"

const getUsers = async() : Promise<User[]> => {
    try {
        const response = await axiosInstance.get('/users');
        return response.data || [];
    } catch (error) {
        console.error("Error during login:", error);
        return [];
    }
}

export {  getUsers };