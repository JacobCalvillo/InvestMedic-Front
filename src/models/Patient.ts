export interface Patient {
    name: string;
    lastName: string;
    birthDate: Date;
    weight: number;
    height: number;
    gender: string;
    maritalStatusId?: number;
    address: string;
    occupation: string;
    allergies?: string;
    currentMedication?: string;
    familyMedicalHistory?: string;
    pastMedicalHistory?: string;
    emergencyContactName: string;
    emergencyContactLastName: string;
    emergencyContactRelationship: string;
    emergencyContactNumber: string;
    insuranceId?: number;
    gynecobstetricsId?: number;
    privacyConsent: boolean;
    consentId?: number;
    userId:number;
    identificationId?: number;
}