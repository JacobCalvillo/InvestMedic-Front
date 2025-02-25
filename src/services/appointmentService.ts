import { axiosInstance} from "@/services/axios.config.ts";
import { Appointment } from "@/models/Appointment";

export const createAppointment = async(data: Appointment): Promise<Appointment | null> => {
    try {
        const newAppointment = await axiosInstance.post('/appointment', data);
        return newAppointment.data;
    } catch (error) {
        console.log(error);
        return null;
    }
}