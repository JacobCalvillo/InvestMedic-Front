// src/models/User.ts
export interface User {
    id?: number;
    username: string;
    email: string;
    password?: string;
    phone: string;
    profilePictureUrl?: string;
    createdAt?: Date;
    updatedAt?: Date;
}