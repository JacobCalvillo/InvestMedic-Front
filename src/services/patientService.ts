import { axiosInstance } from "./axios.config"
import { Patient } from "@/models/Patient";

const registerPatient = async (patient: Patient, identificationNumber:string, identificationUrl:string,
                               identificationTypeId:string) => {
    try {
        const response = await axiosInstance
            .post(`/patient?identificationNumber=${identificationNumber}&identificationUrl=${identificationUrl}&identificationTypeId=${identificationTypeId}`, patient);
        console.log(response.status);
        if(response.status == 201) {
            return response.data;
        }
        return null;
    } catch (error) {
        return error;
    }
}

const getPatient = async (id: string) => {
    try {
        const response = await axiosInstance.get(`/patient/${id}`);
        return response.data;
    } catch (error) {
        return error;
    }
}

export { registerPatient, getPatient }
