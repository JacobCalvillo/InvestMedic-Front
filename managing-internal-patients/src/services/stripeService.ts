import { axiosInstance } from "./axios.config";


export const getStripeClientSecret = async (amount: number, currency: string) => {
    try {
        const secret = await axiosInstance.post("/client/secret", {
            amount: amount,
            currency: currency,
        });

        return secret.data.client_secret;
    } catch (error) {
        return error;
    }
}

export const stripePayment = async (paymentMethod: number, amount: number, currency: string) => {
    try {
        const secret = await axiosInstance.post("/client/payment", {
            amount: amount,
            currency: currency,
            paymentMethod: paymentMethod
        });

        return secret.data.client_secret;
    } catch (error) {
        return error;
    }
}