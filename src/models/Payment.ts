export interface Payment {
    id?: number;
    stripePaymentId?: string;
    amount?: number;
    currency: string;
    paymentMethodId: number;
    patientId: number;
    invoiceId?: number;
}