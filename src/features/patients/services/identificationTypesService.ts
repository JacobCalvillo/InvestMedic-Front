import { axiosInstance } from "../../../core/api/axios.config.ts";
import {IdentificationsType} from "@/features/patients/types/IdentificationsType.ts";

export const getIdentificationTypes = async() : Promise<IdentificationsType[]> => {
    try {
        const response = await axiosInstance.get('/identificationTypes')
        
        return response.data;
    } catch (error) {
        console.error(error)
        return []
    }
}