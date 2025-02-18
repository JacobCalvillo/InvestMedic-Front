class Payment {
    id: string;
    amount: number;
    currency: string;
    transactionId: string;
    method: string;
    status: "pending" | "processing" | "success" | "failed";
    gateway: string;
    bank: string;
    description?: string;
    patientId:number;

    constructor(
            id: string, 
            amount: number,
            currency: string, 
            transactionId: string, 
            method: string, 
            status: "pending" | "processing" | "success" | "failed",  
            gateway: string,
            bank: string,
            patientId: number,
            description?: string
        ) {
            this.id = id;
            this.amount = amount;
            this.currency = currency;
            this.transactionId = transactionId;
            this.method = method;
            this.status = status;
            this.gateway = gateway;
            this.bank = bank;
            this.description = description;
            this.patientId = patientId;
        }
}

export default Payment;


//TODO implemetar interface payment correctamente
// export interface Payment {
//     id?: number;
//     amount: number;
//     currency: string;
//     transactionId: string;
//     method: string;
//     status: "pending" | "processing" | "success" | "failed";
//     gateway: string;
//     bank: string;
//     description?: string;
//     patientId: number;
// }