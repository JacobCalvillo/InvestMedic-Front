import { axiosInstance } from "./axios.config";
import {IdentificationsType} from "@/models/IdentificationsType";

export const getIdentificationTypes = async() : Promise<IdentificationsType[]> => {
    try {
        const response = await axiosInstance.get('/identificationTypes')
        
        return response.data;
    } catch (error) {
        console.error(error)
        return []
    }
}