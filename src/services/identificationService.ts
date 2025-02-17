import { axiosInstance } from "./axios.config";
import { Identification } from "@/models/Identification";
export const createIdentification = async(identification: Identification) => {
    try {
        console.log(identification);
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