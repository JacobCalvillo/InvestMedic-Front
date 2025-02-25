import { z } from "zod"

export const patientValidation = z.object({
    name: z.string()
        .min(2, "Nombre necesita al menos 2 caracteres")
        .max(50, "Nombre no puede superar los 50 caracteres"),
    lastName: z.string()
        .min(2, "Apellido necesita al menos 2 caracteres")
        .max(50, "Apellido no puede superar los 50 caracteres"),
    birthDate: z.coerce.date(),
    gender: z.enum(["Male", "Female", "Other"]),
    street: z.string()
        .min(2, "Calle necesita al menos 2 caracteres")
        .max(50, "Calle no puede superar los 50 caracteres"),
    city: z.string()
        .min(2, "Ciudad necesita al menos 2 caracteres")
        .max(50, "Ciudad no puede superar los 50 caracteres"),
    state: z.string()
        .min(2, "Estado necesita al menos 2 caracteres")
        .max(50, "Estado no puede superar los 50 caracteres"),
    postalCode: z.string()
        .min(2, "Codigo postal necesita al menos 2 caracteres")
        .max(50, "Codigo postal no puede superar los 50 caracteres"),
    occupation: z.string()
        .min(2, "Ocupacion necesita al menos 2 caracteres")
        .max(50, "Ocupacion no puede superar los 50 caracteres"),
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
    maritalStatus: z.string()
        .min(2, "Estado civil necesita al menos 2 caracteres")
        .max(50, "Estado civil no puede superar los 50 caracteres"),
    identificationNumber: z.string()
        .min(4, "Numero de identificacion no puede ser menor a 4")
        .max(10, "Numero de identificacion no puede ser mayor a 10"),
    identificationType: z.string(),
    identificationDocument: z.custom<File[]>().optional(),
    privacyConsent: z.boolean().refine((value) => value, "Debe aceptar los terminos y condiciones")
})