import { z } from "zod"

const loginValidation = z.object({
    email: z.string()
            .email("Direccion de correo no valida"),
    password: z.string()
            .min(6, "Contraseña necesita al menos 6 caracteres."),     
    
})

const registerValidation = z.object({
    username: z.string()
            .min(2, "Nombre necesita al menos 2 caracteres")
            .max(50, "Nombre no puede superar los 50 caracteres"),
    email: z.string()
            .email("Direccion de correo no valida"),
    phone: z.string()
            .refine((phone) => /^\+\d{10,15}$/.test(phone),"Telefono no valido"),
    password: z.string()
            .min(6, "Contraseña necesita al menos 6 caracteres.")
})

const patientValidation = z.object({
        name: z.string()
            .min(2, "Nombre necesita al menos 2 caracteres")
            .max(50, "Nombre no puede superar los 50 caracteres"),
        lastName: z.string()
            .min(2, "Apellido necesita al menos 2 caracteres")
            .max(50, "Apellido no puede superar los 50 caracteres"),
        birthDate: z.coerce.date(),
        weight: z.string().min(1, "Peso no puede ser menor a 1"),
        height: z.string().min(1, "Altura no puede ser menor a 1"),
        gender: z.enum(["Male", "Female", "Other"]),
        address: z.string()
                .min(5, "Direccion necesita al menos 5 caracteres")
                .max(50, "Direccion no puede superar los 50 caracteres"),
        occupation: z.string()
                .min(2, "Ocupacion necesita al menos 2 caracteres")
                .max(50, "Ocupacion no puede superar los 50 caracteres"),
        allergies: z.string().optional(),
        currentMedication: z.string().optional(),
        familyMedicalHistory: z.string().optional(),
        emergencyContactName: z.string()
            .min(2, "Nombre necesita al menos 2 caracteres")
            .max(50, "Nombre no puede superar los 50 caracteres"),
        emergencyContactLastName: z.string()
            .min(2, "Apellido necesita al menos 2 caracteres")
            .max(50, "Apellido no puede superar los 50 caracteres"),
        emergencyContactRelationship: z.string()
            .min(2, "Relacion necesita al menos 2 caracteres")
            .max(50, "Relacion no puede superar los 50 caracteres"),
        emergencyContactNumber: z.string()
            .refine((phone) => /^\+\d{10,15}$/.test(phone),"Telefono no valido"),
        identificationNumber: z.string()
            .min(4, "Numero de identificacion no puede ser menor a 4")
            .max(10, "Numero de identificacion no puede ser mayor a 10"),
        identificationDocument: z.custom<File[]>().optional(),
        privacyConsent: z.boolean().refine((value) => value, "Debe aceptar los terminos y condiciones")
})

const CreateAppointmentValidation = z.object({
        primaryPhysician: z.string().min(2, "Select at least one doctor"),
        schedule: z.coerce.date(),
        reason: z
          .string()
          .min(2, "Reason must be at least 2 characters")
          .max(500, "Reason must be at most 500 characters"),
        note: z.string().optional(),
        cancellationReason: z.string().optional(),
      });
      
const ScheduleAppointmentValidation = z.object({
        primaryPhysician: z.string().min(2, "Select at least one doctor"),
        schedule: z.coerce.date(),
        reason: z.string().optional(),
        note: z.string().optional(),
        cancellationReason: z.string().optional(),
      });
      
const CancelAppointmentValidation = z.object({
        primaryPhysician: z.string().min(2, "Select at least one doctor"),
        schedule: z.coerce.date(),
        reason: z.string().optional(),
        note: z.string().optional(),
        cancellationReason: z
          .string()
          .min(2, "Reason must be at least 2 characters")
          .max(500, "Reason must be at most 500 characters"),
});

const PaymentValidation = z.object({
        cardNumber: z.string(),
      });


function getAppointmentValidation(type: string) {
        switch (type) {
          case "create":
            return CreateAppointmentValidation;
          case "cancel":
            return CancelAppointmentValidation;
          default:
            return ScheduleAppointmentValidation;
        }
      }


export 
{ 
        loginValidation, 
        registerValidation, 
        patientValidation, 
        CreateAppointmentValidation, 
        ScheduleAppointmentValidation, 
        CancelAppointmentValidation, 
        getAppointmentValidation,
        PaymentValidation
};