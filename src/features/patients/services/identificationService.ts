import { axiosInstance } from "../../../core/api/axios.config.ts";
import { Identification } from "@/features/patients/types/Identification.ts";
export const createIdentification = async(identification: Identification) => {
    try {
        const response = await axiosInstance.post('/identification', identification );

        return response.data;
    } catch (error) {
        return error;
    }
}

export const getIdentification = async() => {
    try{
        const response =  await axiosInstance.get('/identifications');
        return response.data
    } catch (error) {
        console.error(error)
        return error
    }
}

export const getIdentificationById = async(id: number) => {
    try{
        const response =  await axiosInstance.get(`/identifications/${id}`);
        return response.data
    } catch (error) {
        console.error(error)
        return error
    }
}