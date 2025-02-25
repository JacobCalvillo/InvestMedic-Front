import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { getMedicalPractitionerAvailability } from "@/services/medicalPractitionerAvailability.service";

interface AvailableDatePickerProps {
    doctorId: string | null;
    dateFormat?: string;
    showTimeSelect?: boolean;
}

const AvailableDatePicker: React.FC<AvailableDatePickerProps> = ({ doctorId, dateFormat, showTimeSelect }) => {
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [availableTimes, setAvailableTimes] = useState<Date[]>([]);

    useEffect(() => {
        if (!doctorId || !selectedDate) return;

        const fetchAvailability = async () => {
            try {
                const dateStr = selectedDate.toISOString().split("T")[0];
                const { availability, appointments } = await getMedicalPractitionerAvailability(doctorId, dateStr);

                if (!availability) return;

                // Convertir los horarios en Date
                const startTime = new Date(`${dateStr}T${availability.start_time}`);
                const endTime = new Date(`${dateStr}T${availability.end_time}`);

                // Generar intervalos de 30 min dentro del rango
                const allTimes = [];
                let current = new Date(startTime);
                while (current < endTime) {
                    allTimes.push(new Date(current));
                    current.setMinutes(current.getMinutes() + 30);
                }

                // Convertir citas reservadas a objetos Date
                const bookedTimes = appointments.map((appt: any) => new Date(appt.start_time));

                // Filtrar horarios disponibles
                const filteredTimes = allTimes.filter(time =>
                    !bookedTimes.some(booked => booked.getTime() === time.getTime())
                );

                setAvailableTimes(filteredTimes);
            } catch (error) {
                console.error("Error fetching available times:", error);
            }
        };

        fetchAvailability();
    }, [doctorId, selectedDate]);

    return (
        <div className="flex">
            <DatePicker
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                dateFormat={dateFormat ?? "dd/MM/yyyy"}
                showTimeSelect
                timeIntervals={30}
                includeTimes={availableTimes} // Solo permitir horarios disponibles
                wrapperClassName="w-full"
                className="bg-zinc-900 border rounded shad-input p-1"
            />
        </div>
    );
};

export default AvailableDatePicker;
