import { z } from "zod"

export const loginValidation = z.object({
    email: z.string()
        .email("Direccion de correo no valida"),
    password: z.string()
        .min(6, "Contraseña necesita al menos 6 caracteres."),

})