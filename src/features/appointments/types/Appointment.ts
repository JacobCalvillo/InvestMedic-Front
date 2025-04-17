export interface Appointment {
    id?:number;
    startTime: Date;
    endTime?: Date;
    reason?:string
    statusId:number;
    patientId:number;
    medicalPractitionerId:number;
    serviceId:number;
}
