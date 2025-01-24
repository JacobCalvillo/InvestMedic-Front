class Appointment {
    id:number;
    patientId: number;
    doctorId: number;
    schedule: Date;
    reason: string;
    notes: string;
    status: string;

    constructor(id: number, patientId: number, doctorId: number, schedule: Date, reason: string, notes: string, status: string) {
        this.id = id;
        this.patientId = patientId;
        this.doctorId = doctorId;
        this.schedule = schedule;
        this.reason = reason;
        this.notes = notes;
        this.status = status;
    }
}

export default Appointment;