import {axiosInstance} from './axios.config';
import {Payment} from "@/models/Payment";

export const createPayment = async (payment: Payment) => {
    try {
        const response = await axiosInstance.post('/payment', payment);
        return response.data;
    } catch (error) {
        return error;
    }
}