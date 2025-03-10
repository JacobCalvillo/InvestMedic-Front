import { z } from "zod"

export const PaymentValidation = z.object({
    cardNumber: z.string(),
});
