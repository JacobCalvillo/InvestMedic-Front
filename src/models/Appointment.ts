export interface Appointment {
    id?:number;
    patientId: number;
    doctorId: number;
    schedule: Date;
    reason: string;
    notes?: string;
    status?: string;
}
