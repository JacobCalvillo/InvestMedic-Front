export interface Patient {
    name: string;
    lastName: string;
    birthDate: Date;
    weight?: number;
    height?: number;
    gender: string;
    street:string;
    city:string;
    state:string;
    postalCode:string;
    occupation: string;
    emergencyContactName: string;
    emergencyContactLastName: string;
    emergencyContactRelationship: string;
    emergencyContactNumber: string;
    maritalStatus?: string;
    privacyConsent: boolean;
    userId:number;
}