import React from "react"
import { CreateAppointmentValidation, getAppointmentValidation } from "@/features/appointments/appointment.validation.ts"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form } from "@/shared/components/ui/form.tsx"
import CustomFormField from "@/shared/components/ui/CustomFormField.tsx"
import { FormFieldType } from "@/constants"
import SubmitButton from "../../../../shared/components/ui/SubmitButton.tsx"
import { SelectItem } from "@/shared/components/ui/select.tsx"
import { getMedicalPractitioners} from "@/features/appointments/services/medicalPractitioner.service.ts";
import { getServices } from '@/services/servicesService.ts'
import { MedicalPractitioner } from "@/features/appointments/types/MedicalPractitioner.ts";
import { Service } from '@/models/Service.ts'
import {createAppointment} from "@/features/appointments/services/appointmentService.ts";
import {Appointment} from "@/features/appointments/types/Appointment.ts";
import { User } from "@/models/User.ts";
//import { useNavigate } from "react-router-dom"
import {createCheckoutSession} from "@/features/payments/services/stripeService.ts";
//import AvailableDatePicker from "../AvailableDatePicker";
import {useUser} from "@/shared/hooks/user-provider.tsx";
import { StripeSession } from "@/features/payments/types/StripeSession.ts";

const AppointmentForm = ({ type }: { type: "create" | "cancel" | "schedule" }) => {

    const patient = JSON.parse(localStorage.getItem("patient") as string);

    const { user } = useUser() as unknown as { user: User };

    const [isLoading, setIsLoading] = React.useState(false)
    const [doctors, setDoctors] = React.useState<MedicalPractitioner[]>([]);
    const [services, setServices] = React.useState<Service[]>([]);
    // const navigate = useNavigate();
    const AppointmentFormValidation = getAppointmentValidation(type);

    const form = useForm<z.infer<typeof CreateAppointmentValidation>>({
        resolver: zodResolver(AppointmentFormValidation),
        defaultValues: {
            primaryPhysician: "",
            schedule: new Date(),
            reason: "",
            service:""
        },
        mode: "onChange",
    });
    React.useEffect(() => {
        async function fetchDoctors() {
            try {
                const medicalPractitioners = await getMedicalPractitioners();
                const services = await getServices();
                setDoctors(medicalPractitioners);
                setServices(services);
            } catch (error) {
                console.error("Error fetching medical practitioners:", error);
            }
        }
        fetchDoctors();
    }, []);


    async function onSubmit(values: z.infer<typeof CreateAppointmentValidation>) {
        setIsLoading(true);
        try {
            console.log("Form submitted:", values);
            console.log(patient);

            if (patient) {
                const appointment: Appointment = {
                    startTime: values.schedule,
                    reason: values.reason,
                    statusId: 6, // PENDING_PAYMENT
                    patientId: patient.id,
                    serviceId: Number(values.service),
                    medicalPractitionerId: Number(values.primaryPhysician)
                };

                // Crear cita en estado PENDING_PAYMENT
                const newAppointment = await createAppointment(appointment);
                console.log("Cita creada:", newAppointment);

                if (newAppointment) {
                    const session: StripeSession = {
                        serviceId: Number(values.service),
                        customerEmail: user.email,
                        quantity: 1,
                        appointmentId: newAppointment.id // Pasamos el ID de la cita a Stripe
                    };


                    const url = await createCheckoutSession(session);
                    console.log("URL de pago:", url);

                    if (url) {
                        window.location.href = url;
                    }
                }
            }
        } catch (error) {
            console.error(error);
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
        case "schedule":
            buttonLabel = "Agendar cita";
            break;
        default:
            break;
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 flex-1">
                <section className="mb-12 space-y-4">
                    <p className="text-3xl">Agenda tu Cita</p>
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
                            {doctors.map((doctor) => (
                                <SelectItem key={doctor.name} value={doctor.id?.toString() ||
                                    "No se cargaron los doctores correctamente"}>
                                    <div className="flex cursor-pointer items-center gap-2">
                                        <img
                                            src={doctor.user?.profilePictureUrl}
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
                        {/*
                        TODO Implementar available date picker correctamente para que aparezcan los horarios disponibles
                            es decir comparar los appointments vs medicalpractitioneravailability
                        */}
                        <CustomFormField
                            fieldType={FormFieldType.DATEPICKER}
                            control={form.control}
                            iconSrc="/calendar-regular.svg"
                            iconAlt="calendar icon"
                            name="schedule"
                            label="Fecha de la Cita"
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
                        </div>
                        <div className="flex flex-col gap-6 xl:flex-row">
                            <CustomFormField
                                fieldType={FormFieldType.SELECT}
                                control={form.control}
                                name="service"
                                label="Servicio"
                                placeholder="Seleccione un Servicio..."
                            >
                                {services.map((service) => (
                                    <SelectItem key={service.id} value={service.id?.toString() ||
                                        "No se cargaron los servicios"}>
                                        {service.name}
                                    </SelectItem>
                                ))}
                            </CustomFormField>
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
                    type="submit"
                    isLoading={isLoading}
                    className={`${type === "cancel" ? "bg-red-800 text-white" : "shad-primary-btn"} w-full`}
                >
                    {buttonLabel}
                </SubmitButton>


            </form>
        </Form>
    );
};

export default AppointmentForm;
