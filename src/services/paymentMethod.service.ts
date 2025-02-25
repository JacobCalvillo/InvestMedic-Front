import { axiosInstance} from "@/services/axios.config.ts";
import { PaymentMethod } from "@/models/PaymentMethod";

export const getPaymentMethods = async ():Promise<PaymentMethod[] | null> => {
    try {
        const response = await axiosInstance.get('/payment/methods');
        return response.data || null;
    } catch (error) {
        console.error(error)
        return null;
    }

}