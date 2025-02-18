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
import { useNavigate } from "react-router-dom"
import IdentificationDialog from "../dialogs/IdentificationDialog"
import { FormFieldType, GenderOptions } from "@/constants"
import { useUser } from "@/hooks/user-provider"
import { registerPatient } from "@/services/patientService"
import { Patient } from "@/models/Patient.ts"
import { Identification } from "@/models/Identification.ts"
import {fileUploadDocuments, getFileDocumentsUrl} from "@/services/fileService.ts";
import { createIdentification } from '@/services/identificationService.ts'

const RegisterUserPatientForm = () => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  const { user } = useUser();
  const [isLoading, setIsLoading] = React.useState(false);

  const navigate = useNavigate();


  const form = useForm<z.infer<typeof patientValidation>>({
    resolver: zodResolver(patientValidation),
    defaultValues: {
      name: "",
      lastName: "",
      weight: "",
      height: "",
      birthDate: new Date(Date.now()),
      gender: "Male",
      address: "",
      occupation: "",
      emergencyContactName: "",
      emergencyContactLastName:"",
      emergencyContactNumber: "",
      emergencyContactRelationship: "",
      allergies: "",
      currentMedication: "",
      identificationNumber: "",
      identificationType: "",
      identificationDocument: [],
      privacyConsent: false
    },
  })

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof patientValidation>) {
    setIsLoading(true);

    try {
      if (values.identificationDocument && values.identificationDocument?.length > 0) {
        await fileUploadDocuments(values.identificationDocument?.[0], user.id);
        const fileName = values.identificationDocument?.[0].name;
        const fileUrl = await getFileDocumentsUrl(user.id, fileName);

        const identification : Identification = {
              identificationTypeId: Number(values.identificationType),
              number: values.identificationNumber,
              identificationDocumentUrl: fileUrl
        }
        //crear documentos
        const newIdentification = await createIdentification(identification);

        if(newIdentification.id !== null) {
          // Crear la instancia del paciente
          const patient: Patient = {
            name: values.name,
            lastName: values.lastName,
            birthDate: values.birthDate,
            weight: Number(values.weight),
            height: Number(values.height),
            gender: values.gender,
            address: values.address,
            occupation: values.occupation,
            emergencyContactName: values.emergencyContactName,
            emergencyContactLastName: values.emergencyContactLastName,
            emergencyContactRelationship: values.emergencyContactRelationship,
            emergencyContactNumber: values.emergencyContactNumber,
            allergies: values.allergies,
            currentMedication: values.currentMedication,
            userId: user.id,
            privacyConsent: values.privacyConsent,
            identificationId: newIdentification.id
          }
          const newPatient = await registerPatient(patient);
          console.log(newPatient);

          if (newPatient) {
            navigate('/appointment', { state: { patientId: newPatient.id } });
          }
        }
      }

    } catch (error) {
      console.error("Error al enviar el formulario:", error);
    }

    setIsLoading(false);
  }

  return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 flex-1">
          <section className="space-y-4">
            <h1 className="text-4xl font-bold">Cuéntanos Mas Sobre Ti</h1>
          </section>

          <section className="space-y-6">
            <div className="mb-9 space-y-1">
              <h2 className="text-lg font-semibold">
                Información Personal
              </h2>
            </div>
          </section>

          <div className="flex gap-4">
            <CustomFormField
                fieldType={FormFieldType.INPUT}
                control={form.control}
                name="name"
                label="Nombre(s)"
                placeholder="John Doe"
                iconSrc="/user-solid.svg"
                iconAlt="user icon"
            />

            <CustomFormField
                fieldType={FormFieldType.INPUT}
                control={form.control}
                name="lastName"
                label="Apellidos"
                placeholder="John Doe"
                iconSrc="/user-solid.svg"
                iconAlt="user icon"
            />
          </div>
            <CustomFormField
                fieldType={FormFieldType.INPUT}
                control={form.control}
                name="weight"
                label="Peso"
                placeholder="80kg"

            />
            <CustomFormField
                fieldType={FormFieldType.INPUT}
                control={form.control}
                name="height"
                label="Estatura"
                placeholder="180cm"
            />
          <div>

          </div>

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
                renderSkeleton={(field) => (
                    <FormControl>
                      <RadioGroup className="flex h-11 gap-6 xl:justify-between"
                                  onValueChange={field.onChange}
                                  defaultValue={field.value}>
                        {GenderOptions.map((option) => (
                            <div key={option} className="radio-group">
                              <RadioGroupItem
                                  id={option}
                                  value={option}
                                  className="radio-group-item" />
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
                fieldType={FormFieldType.INPUT}
                control={form.control}
                name="emergencyContactLastName"
                label="Apellidos de Contacto de Emergencia"
                placeholder="Guardians"
            />

            <CustomFormField
                fieldType={FormFieldType.PHONE_INPUT}
                control={form.control}
                name="emergencyContactNumber"
                label="Telefono de Contacto de Emergencia"
                placeholder="+54 11 1234 5678"
            />

            <CustomFormField
                fieldType={FormFieldType.INPUT}
                control={form.control}
                name="emergencyContactRelationship"
                label="Relacion de Contacto de Emergencia"
                placeholder="Madre, Padre, etc..."
            />
          </div>

          <section className="space-y-6">
            <div className="mb-9 space-y-1">
              <h2 className="text-lg font-semibold">
                Informacion Medica
              </h2>
            </div>
          </section>

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

          <section className="space-y-6">
            <div className="mb-9 space-y-1">
              <IdentificationDialog control={form.control}  />
            </div>
          </section>

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
              name="privacyConsent"
              label="Consiento los datos de privacidad"
          />

          <SubmitButton isLoading={isLoading}>Agendar</SubmitButton>

        </form>
      </Form>
  )
}

export default RegisterUserPatientForm;
