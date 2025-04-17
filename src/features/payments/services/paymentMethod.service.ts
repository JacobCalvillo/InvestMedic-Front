import { axiosInstance} from "@/core/api/axios.config.ts";
import { PaymentMethod } from "@/features/payments/types/PaymentMethod.ts";

export const getPaymentMethods = async ():Promise<PaymentMethod[] | null> => {
    try {
        const response = await axiosInstance.get('/payment/methods');
        return response.data || null;
    } catch (error) {
        console.error(error)
        return null;
    }

}