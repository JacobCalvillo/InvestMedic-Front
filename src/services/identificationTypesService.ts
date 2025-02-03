import { axiosInstance } from "./axios.config";
import IdentificationTypes from "@/models/IdentificationsType";

export const getIdentificationTypes = async() : Promise<IdentificationTypes[]> => {
    try {
        const response = await axiosInstance.get('/identifications/types')
        
        return response.data;
    } catch (error) {
        console.error(error)
        return []
    }
}