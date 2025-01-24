import { axiosInstance } from "./axios.config";

export const getServices = async () => {
    try {
        const response = await axiosInstance.get("/services");
        return response.data;
    } catch (error) {
        return error;
    }
};

export const getServiceById = async (id: string) => {
    try {
        const response = await axiosInstance.get(`/service/${id}`);
        return response.data;
    } catch (error) {
        return error;
    }
};