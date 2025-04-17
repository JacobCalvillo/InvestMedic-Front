import { axiosInstance } from "../../../core/api/axios.config.ts";
import { StripeSession } from "@/features/payments/types/StripeSession.ts";


export const createCheckoutSession = async (
    session: StripeSession,
) => {
    try {
        const response = await axiosInstance.post('/services/stripe', session)
        console.log(response.data)
        if(response.status === 200) {
            return response.data.url;
        }
        return null;
    } catch (error) {
        return error;
    }
}

