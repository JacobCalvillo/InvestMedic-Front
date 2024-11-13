
class Patient {
    name: string
    birthDate: Date
    gender: string
    address: string
    occupation: string
    emergencyContactName: string
    emergencyContactPhone: string
    primaryPhysician: string
    insuranceProvider: string
    insurancePolicyNumber: string
    userId: number
    allergies?: string
    currentMedication?: string
    familyMedicalHistory?: string
    pastMedicalHistory?: string
    identificationType?: string
    identificationNumber?: string
    identificationDocumentUrl?: string
    treatments: boolean
    disclosureConsent: boolean
    privacyConsent: boolean


    constructor(
        name: string, 
        birthDate: Date, 
        gender: string, 
        address: string,
        occupation: string, 
        emergencyContactName: string,
        emergencyContactPhone: string,
        primaryPhysician: string,
        insuranceProvider: string,
        insurancePolicyNumber: string,
        userId: number,
        treatments: boolean,
        disclosureConsent: boolean,
        privacyConsent: boolean,
        allergies?: string,
        currentMedication?: string,
        familyMedicalHistory?: string,
        pastMedicalHistory?: string,
        identificationType?: string,
        identificationNumber?: string,
        identificationDocumentUrl?: string
    ) 
        {
            this.name = name;
            this.birthDate = birthDate; 
            this.gender = gender;
            this.address = address;
            this.occupation = occupation;
            this.emergencyContactName = emergencyContactName;
            this.emergencyContactPhone = emergencyContactPhone;
            this.primaryPhysician = primaryPhysician;
            this.insuranceProvider = insuranceProvider;
            this.insurancePolicyNumber = insurancePolicyNumber;
            this.allergies = allergies;
            this.currentMedication = currentMedication;
            this.familyMedicalHistory = familyMedicalHistory;
            this.pastMedicalHistory = pastMedicalHistory;
            this.identificationType = identificationType;
            this.identificationNumber = identificationNumber;
            this.identificationDocumentUrl = identificationDocumentUrl;
            this.treatments = treatments;
            this.disclosureConsent = disclosureConsent;
            this.privacyConsent = privacyConsent;
            this.userId = userId
        }
}

export default Patient;