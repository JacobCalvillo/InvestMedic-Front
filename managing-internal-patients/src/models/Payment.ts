class Payment {
    id: string;
    amount: number;
    status: "pending" | "processing" | "success" | "failed";
    description?: string;
    patientId:number;

    constructor(id: string, amount: number, status: "pending" | "processing" | "success" | "failed",  patientId: number,description?: string,) {
        this.id = id;
        this.amount = amount;
        this.status = status;
        this.description = description;
        this.patientId = patientId;
    }
}

export default Payment;