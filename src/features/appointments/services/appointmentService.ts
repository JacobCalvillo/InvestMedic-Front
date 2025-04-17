import { axiosInstance} from "@/core/api/axios.config.ts";
import { Appointment } from "@/features/appointments/types/Appointment.ts";

export const createAppointment = async(data: Appointment): Promise<Appointment | null> => {
    try {
        const newAppointment = await axiosInstance.post('/appointment', data);
        return newAppointment.data;
    } catch (error) {
        console.log(error);
        return null;
    }
}