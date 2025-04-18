import { axiosInstance } from "../core/api/axios.config.ts";

export const getServices = async () => {
    try {
        const response = await axiosInstance.get("/services");
        return response.data;
    } catch (error) {
        return error;
    }
};

export const getServiceById = async (id: number) => {
    try {
        const response = await axiosInstance.get(`/service/${id}`);
        return response.data;
    } catch (error) {
        return error;
    }
};