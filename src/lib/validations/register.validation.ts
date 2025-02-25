import { z } from "zod"

export const registerValidation = z.object({
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