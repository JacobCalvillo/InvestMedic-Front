export interface StripeSession  {
    serviceId: number;
    customerEmail: string;
    quantity: number;
    appointmentId?: number;
}