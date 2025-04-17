import {axiosInstance} from "@/core/api/axios.config.ts";

export const getMedicalPractitioners = async () => {
    try {
        const response = await axiosInstance.get('/medicalpractitioners')
        return response.data || null;
    } catch (error) {
        return error;
    }
}