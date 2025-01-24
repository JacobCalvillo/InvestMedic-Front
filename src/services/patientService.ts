import { axiosInstance } from "./axios.config"
import Patient from "@/models/Patient";

const registerPatient = async (patient: Patient) => {
    try {
        const response = await axiosInstance.post('/patient', { patient });
        console.log(response.data);
        return response.data;
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
