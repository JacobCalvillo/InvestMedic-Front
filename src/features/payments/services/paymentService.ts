import {axiosInstance} from '../../../core/api/axios.config.ts';
import {Payment} from "@/features/payments/types/Payment.ts";

export const createPayment = async (payment: Payment) => {
    try {
        const response = await axiosInstance.post('/payment', payment);
        return response.data;
    } catch (error) {
        return error;
    }
}