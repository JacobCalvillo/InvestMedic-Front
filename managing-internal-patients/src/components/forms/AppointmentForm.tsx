import React from "react"
import { getAppointmentValidation } from "@/lib/validation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form } from "../ui/form"
import CustomFormField from "@/components/CustomFormField"
import { Doctors, FormFieldType } from "../../constants/index"
import SubmitButton from "../SubmitButton"
import { useLocation, useNavigate } from "react-router-dom"
import { SelectItem } from "../ui/select"


const AppointmentForm = ({type}: {type: "create" | "cancel" | "schedule"}) => {

    const location = useLocation();
    const patientId = location.state?.patientId;

    const navigate = useNavigate();

    const [isLoading, setIsLoading] = React.useState(false)

    const AppointmentFormValidation = getAppointmentValidation(type);

    const form = useForm<z.infer<typeof AppointmentFormValidation>>({
        resolver: zodResolver(AppointmentFormValidation),
        defaultValues: {
        primaryPhysician: "",
        schedule: new Date(),
        reason: "",
        note: "",
        cancellationReason: "",
        },
    })

    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof AppointmentFormValidation>) {
        setIsLoading(true);
        
        let status;
        switch (type) {
        case "schedule":
            status = "SCHEDULED";
            break;
        case "cancel":
            status = "CANCELLED";
            break;
        default:
            status = "PENDING";
            break;
        }

        try {
            if(type === 'create' && userId) {
                const appointment = { 
                    patientId: patientId,
                    doctorId: values.primaryPhysician.id!,
                    schedule: new Date(values.schedule),
                    reason: values.reason,
                    note: values.note,
                    status: status
                }
                //const newAppointment = await createAppointment(appointment);
                console.log(appointment);
            }
            

        } catch (error) {
        console.log(error);
        }

        setIsLoading(false);
    }
    let buttonLabel;

    switch (type) {
        case "create":
        buttonLabel = "Crear cita";
        break;
        case "cancel":
        buttonLabel = "Cancelar cita";
        break;
        case 'schedule':
        buttonLabel = "Agendar cita";
        break;
        default:
        break;
    }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 flex-1">

        <section className="mb-12 space-y-4">
            <p className="text-3xl">New Appointment</p>
        </section>
        {type !== "cancel" && (
            <>
                <CustomFormField
                    fieldType={FormFieldType.SELECT}
                    control={form.control}
                    name="primaryPhysician"
                    label="Doctor principal"
                    placeholder="Selecciona un doctor"
                >
                    {Doctors.map((doctor) => (
                    <SelectItem key={doctor.name} value={doctor.name}>
                        <div className="flex cursor-pointer items-center gap-2">
                        <img
                            src={doctor.image}
                            alt={doctor.name}
                            width={32}
                            height={32}
                            className="rounded-full border border-dark-500"
                        />
                        <p>{doctor.name}</p>
                        </div>
                    </SelectItem>
                    ))}
                </CustomFormField>

                <CustomFormField
                    fieldType={FormFieldType.DATEPICKER}
                    control={form.control}
                    iconSrc="/calendar-regular.svg"
                    iconAlt="calendar icon"
                    name="schedule"
                    label="Expected appointment date"
                    showTimeSelect
                    dateFormat="dd/MM/yyyy hh:mm aa"
                />

                <div className="flex flex-col gap-6 xl:flex-row">
                    <CustomFormField 
                        fieldType={FormFieldType.TEXTAREA}
                        control={form.control}
                        name="reason"
                        label="Razon de la consulta"
                        placeholder="Motivo de la consulta"
                    />

                    <CustomFormField 
                        fieldType={FormFieldType.TEXTAREA}
                        control={form.control}
                        name="note"
                        label="Notas"
                        placeholder="Ingresa tus notas"
                    />
                </div>
            </>
        )}
        {type === "cancel" && (
            <CustomFormField 
                fieldType={FormFieldType.TEXTAREA}
                control={form.control}
                name="cancellationReason"
                label="Motivo de cancelacion"
                placeholder="Registra el motivo de la cancelacion"
            />
        )}
       
        
        <SubmitButton  
            isLoading={isLoading} 
            className={`${type === "cancel" ? "bg-red-800 text-white" : "shad-primary-btn"} w-full`} 
            >
                {buttonLabel}
        </SubmitButton>
      </form>
    </Form>
  )
}

export default AppointmentForm;