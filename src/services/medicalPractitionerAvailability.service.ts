import { axiosInstance } from "./axios.config";

export const getMedicalPractitionerAvailability = async (id: string) => {
    try {
        const response = await axiosInstance.get(`/medicalpractitioner/${id}/availability`);
        return response.data;
    } catch (error) {
        return error;
    }
};