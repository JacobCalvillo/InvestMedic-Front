export interface Payment {
    id?: number;
    amount: number;
    currency: string;
    transactionId: string;
    method: string;
    status: "pending" | "processing" | "success" | "failed";
    gateway: string;
    bank: string;
    description?: string;
    patientId: number;
}