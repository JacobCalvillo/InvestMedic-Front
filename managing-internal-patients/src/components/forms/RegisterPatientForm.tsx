import React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormControl } from "@/components/ui/form"
import CustomFormField from "../CustomFormField"
import SubmitButton from "../SubmitButton"
import { patientValidation } from "@/lib/validation"
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from "../ui/label"
import { SelectItem } from "../ui/select"
import FileUploader from "../FileUploader"
import { useNavigate } from "react-router-dom"
import { FormFieldType, GenderOptions, Doctors, IdentificationTypes } from "@/constants"
import { registerPatient } from "@/services/patientService"
import Patient from "../../models/Patient"
import { useLocation } from "react-router-dom";
import {  fileUploadDocuments, getFileDocumentsUrl } from "@/services/fileService"


const RegisterPatientForm = () => {
  const location = useLocation();
  const userId = location.state?.userId;
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = React.useState(false);

  const form = useForm<z.infer<typeof patientValidation>>({
    resolver: zodResolver(patientValidation),
    defaultValues: {
      name: "",
      birthDate: new Date(Date.now()),
      gender: "Male",
      address: "",
      occupation: "",
      emergencyContactName: "",
      emergencyContactNumber: "",
      primaryPhysician: "",
      insuranceProvider: "",
      insurancePolicyNumber: "", 
      allergies: "",
      currentMedication: "",
      familyMedicalHistory: "",
      pastMedicalHistory: "",
      identificationNumber: "",
      identificationType: "",
      identificationDocument: [],
      treatmentsConsent: false,
      disclosureConsent: false,
      privacyConsent: false
    },
  })

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof patientValidation>) {
    
    setIsLoading(true);

    try {
      if (values.identificationDocument && values.identificationDocument?.length > 0) {
        fileUploadDocuments(values.identificationDocument?.[0], userId);
        const fileName = values.identificationDocument?.[0].name;
        const fileUrl = await getFileDocumentsUrl(userId, fileName);
        console.log(fileUrl)

        const patient = new Patient(
          values.name,
          values.birthDate,
          values.gender,
          values.address,
          values.occupation,
          values.emergencyContactName,
          values.emergencyContactNumber,
          values.primaryPhysician,
          values.insuranceProvider,
          values.insurancePolicyNumber,
          userId,
          values.treatmentsConsent,
          values.disclosureConsent,
          values.privacyConsent,
          values.allergies,
          values.currentMedication,
          values.familyMedicalHistory,
          values.pastMedicalHistory,
          values.identificationType,
          values.identificationNumber,
          fileUrl.image,
        )
        const newPatient = await registerPatient(patient)
        console.log(newPatient)
        
        if (newPatient) {
          navigate('/appointment', { state: { patientId: newPatient.id } })
        }

      } else {
        const patient = new Patient(
          values.name,
          values.birthDate,
          values.gender,
          values.address,
          values.occupation,
          values.emergencyContactName,
          values.emergencyContactNumber,
          values.primaryPhysician,
          values.insuranceProvider,
          values.insurancePolicyNumber,
          userId,
          values.treatmentsConsent,
          values.disclosureConsent,
          values.privacyConsent,
          values.allergies,
          values.currentMedication,
          values.familyMedicalHistory,
          values.pastMedicalHistory,
          values.identificationType,
          values.identificationNumber,
          "",
        )

        const newPatient = await registerPatient(patient)
        console.log(newPatient)
        
        if (newPatient) {
          navigate('/appointment', { state: { patientId: newPatient.data.id } })
        }
      }

    } catch (error) {
      console.error("Error al enviar el formulario:", error)
    }

    setIsLoading(false)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 flex-1">
        <section className="space-y-4">
            <h1 className="text-4xl font-bold">Cuentanos Mas Sobre Ti</h1>
        </section>

        <section className="space-y-6">
            <div className="mb-9 space-y-1">
                <h2 className="text-lg font-semibold">
                    Informacion Personal
                </h2>
            </div>
        </section>

        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="name"
          label="Nombre Completo"
          placeholder="John Doe"
          iconSrc="/user-solid.svg"
          iconAlt="user icon"
        />

        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormField
            fieldType={FormFieldType.DATEPICKER}
            control={form.control}
            iconSrc="/calendar-regular.svg"
            iconAlt="calendar icon"
            name="birthDate"
            label="Fecha de Nacimiento"
          />

          <CustomFormField
            fieldType={FormFieldType.SKELETON}
            control={form.control}
            name="gender"
            label="Genero"
            renderSkeleton={( field ) => (
              <FormControl>
                <RadioGroup className="flex h-11 gap-6 xl:justify-between"
                  onValueChange={field.onChange}
                  defaultValue={field.value}>

                    {GenderOptions.map((option) => (
                      <div key={option} className="radio-group">
                        <RadioGroupItem
                          id={option}
                          value={option}                          
                          className="radio-group-item"/>
                          <Label htmlFor={option} className="cursor-pointer">
                            {option}
                          </Label>
                      </div>
                    ))}

                </RadioGroup>
              </FormControl>
            )}
            placeholder="+54 11 1234 5678"
          />
        </div>

        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="address"
            label="Dirección"
            placeholder="Calle 123 #123"
          />

          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="occupation"
            label="Ocupación"
            placeholder="Profesional"
          />
        </div>

        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="emergencyContactName"
            label="Nombre de Contacto de Emergencia"
            placeholder="Guardians"
          />

          <CustomFormField
            fieldType={FormFieldType.PHONE_INPUT}
            control={form.control}
            name="emergencyContactNumber"
            label="Telefono de Contacto de Emergencia"
            placeholder="+54 11 1234 5678"
          />
        </div>
        
        <section className="space-y-6">
            <div className="mb-9 space-y-1">
                <h2 className="text-lg font-semibold">
                    Informacion Medica
                </h2>
            </div>
        </section>

          <CustomFormField
            fieldType={FormFieldType.SELECT}
            control={form.control}
            name="primaryPhysician"
            label="Doctor principal"
            placeholder="Selecciona un doctor"
          >
            {Doctors.map((doctor) => (
              <SelectItem key={doctor.name} value={doctor.name}>
                <div className="flex cursor-pointer items-center gap-2">
                  <img
                    src={doctor.image}
                    alt={doctor.name}
                    width={32}
                    height={32}
                    className="rounded-full border border-dark-500"
                  />
                  <p>{doctor.name}</p>
                </div>
              </SelectItem>
            ))}
          </CustomFormField>

        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="insuranceProvider"
            label="Provedor de Seguro"
            placeholder="Aseguradora"
          />

          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="insurancePolicyNumber"
            label="Poliza"
            placeholder="Poliza"
          />
        </div>

        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormField
            fieldType={FormFieldType.TEXTAREA}
            control={form.control}
            name="allergies"
            label="Alergias"
            placeholder="Penicilina, cacahuates..."
          />

          <CustomFormField
            fieldType={FormFieldType.TEXTAREA}
            control={form.control}
            name="currentMedication"
            label="Medicacion Actual (si hay)"
            placeholder="Penicilina, paracetamol, insulina"
          />
        </div>

        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormField
            fieldType={FormFieldType.TEXTAREA}
            control={form.control}
            name="familyMedicalHistory"
            label="Historial Medico Familiar"
            placeholder="Padre, Madre, hermanos..."
          />

          <CustomFormField
            fieldType={FormFieldType.TEXTAREA}
            control={form.control}
            name="pastMedicalHistory"
            label="Historial Medico Anterior"
            placeholder="Colectomia, cirugia..."
          />
        </div>
       
        <section className="space-y-6">
            <div className="mb-9 space-y-1">
                <h2 className="text-lg font-semibold">
                    Identificacion y Verificacion
                </h2>
            </div>
        </section>

        <CustomFormField
            fieldType={FormFieldType.SELECT}
            control={form.control}
            name="identifcacionType"
            label="Tipo de Identificación"
            placeholder="Selecciona un tipo de identificación"
          >
            {IdentificationTypes.map((type) => (
              <SelectItem key={type} value={type}>
                {type}
              </SelectItem>
            ))}
          </CustomFormField>

          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="identificationNumber"
            label="Numero de Identificación"
            placeholder="123456"
          />

          <CustomFormField
            fieldType={FormFieldType.SKELETON}
            control={form.control}
            name="identificationDocument"
            label="Documento de Identificación"
            renderSkeleton={( field ) => (
              <FormControl>
                <FileUploader 
                  files={field.value} 
                  onChange={field.onChange}
                />
              </FormControl>
            )}
            placeholder="+54 11 1234 5678"
          />

        <section className="space-y-6">
            <div className="mb-9 space-y-1">
                <h2 className="text-lg font-semibold">
                    Privacidad y Consentimiento
                </h2>
            </div>
        </section>

        <CustomFormField 
          fieldType={FormFieldType.CHECKBOX}
          control={form.control}
          name="treatmentsConsent"
          label="Consentir tratamiento"
        />

        <CustomFormField 
          fieldType={FormFieldType.CHECKBOX}
          control={form.control}
          name="disclosureConsent"
          label="Consiento a que mis datos sean utilizados para la atención médica"
        />

        <CustomFormField 
          fieldType={FormFieldType.CHECKBOX}
          control={form.control}
          name="privacyConsent"
          label="Consiento los datos de privacidad"
        />

        
        <SubmitButton isLoading={isLoading}>Agendar</SubmitButton>

      </form>
    </Form>
  )
}

export default RegisterPatientForm;