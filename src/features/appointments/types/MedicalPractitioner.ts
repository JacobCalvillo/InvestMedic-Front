import { User } from "../../../models/User.ts";

export interface MedicalPractitioner {
    user?: User;
    id?: number;
    name: string;
    lastName: string;
    birthDate: Date;
    user_id: number;
}