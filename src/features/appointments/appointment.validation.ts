import { z } from "zod"

export const CreateAppointmentValidation = z.object({
    primaryPhysician: z.string().min(1, "Select at least one doctor"),
    schedule: z.coerce.date(),
    service: z.string().min(1, "Select at least one service"),
    reason: z
        .string()
        .min(2, "Reason must be at least 2 characters")
        .max(500, "Reason must be at most 500 characters")

});

export const ScheduleAppointmentValidation = z.object({
    primaryPhysician: z.string().min(1, "Select at least one doctor"),
    schedule: z.coerce.date(),
    reason: z.string().optional(),
    cancellationReason: z.string().optional(),
});


export const CancelAppointmentValidation = z.object({
    primaryPhysician: z.string().min(1, "Select at least one doctor"),
    schedule: z.coerce.date(),
    reason: z.string().optional(),
    cancellationReason: z
        .string()
        .min(2, "Reason must be at least 2 characters")
        .max(500, "Reason must be at most 500 characters"),
});

export function getAppointmentValidation(type: string) {
    switch (type) {
        case "create":
            return CreateAppointmentValidation;
        case "cancel":
            return CancelAppointmentValidation;
        default:
            return ScheduleAppointmentValidation;
    }
}
