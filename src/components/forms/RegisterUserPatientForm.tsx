import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl } from "@/components/ui/form";
import CustomFormField from "../CustomFormField";
import SubmitButton from "../SubmitButton";
import { patientUserValidation } from "@/lib/validation";
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from "../ui/label";
import { useNavigate } from "react-router-dom";
import IdentificacionDialog from "../dialogs/IdentificationDialog";
import { FormFieldType, GenderOptions } from "@/constants";
import { useUser } from "@/hooks/user-provider";
import { registerPatient } from "@/services/patientService";
import Patient from "../../models/Patient";
import Identification from "@/models/Identification";
import { createIdentification } from "@/services/identificationService";
import { fileUploadDocuments, getFileDocumentsUrl } from "@/services/fileService";

const RegisterUserPatientForm = () => {
  const { user } = useUser();
  const [isLoading, setIsLoading] = React.useState(false);
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof patientUserValidation>>({
    resolver: zodResolver(patientUserValidation),
    defaultValues: {
      name: "",
      lastName: "",
      birthDate: new Date(Date.now()),
      gender: "Male",
      address: "",
      occupation: "",
      emergencyContactName: "",
      emergencyContactLastName: "",
      emergencyContactNumber: "",
      emergencyContactRelationship: "",
      allergies: "",
      currentMedication: "",
      identificationNumber: "",
      identificationType: "",
      identificationDocument: [],
      privacyConsent: false,
    },
  });

  const onSubmit = async (values: z.infer<typeof patientUserValidation>) => {
    setIsLoading(true);
    
    try {
      await fileUploadDocuments(
        values.identificationDocument[0], 
        user.id
      );
      
      const documentUrl = await getFileDocumentsUrl(user.id, values.identificationDocument[0].name);

      // 3. Crear identificación
      const newIdentification = await createIdentification(new Identification(
        values.identificationTypeId,
        values.identificationNumber,
        documentUrl.image
      ));
      console.log(newIdentification);

      // 4. Crear paciente con la nueva identificación
      const patient = new Patient(
        values.name,
        values.lastName,
        values.birthDate,
        null,
        null,
        values.gender,
        values.address,
        null,
        values.occupation,
        values.emergencyContactName,
        values.emergencyContactLastName,
        values.emergencyContactRelationship,
        values.emergencyContactNumber,
        null,
        values.allergies,
        values.currentMedication,
        '',
        '',
        newIdentification.id, 
        null,
        null,
        values.privacyConsent,
        user?.id
      );
      
      console.log(patient);
      const newPatient = await registerPatient(patient);
      console.log(newPatient);
      if (newPatient?.id) {
        navigate('/appointment');
      }
      
    } catch (error) {
      console.error("Error en el registro:", error);
      alert("Error en el proceso de registro. Intente nuevamente.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 flex-1">
        <section className="space-y-4">
          <h1 className="text-4xl font-bold">Cuentanos Mas Sobre Ti</h1>
        </section>

        <section className="space-y-6">
          <div className="mb-9 space-y-1">
            <h2 className="text-lg font-semibold">Informacion Personal</h2>
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
            label="Nombre(s) de Contacto de Emergencia"
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
            <h2 className="text-lg font-semibold">Informacion Medica</h2>
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
            <IdentificacionDialog control={form.control}/>
          </div>
        </section>

        <section className="space-y-6">
          <div className="mb-9 space-y-1">
            <h2 className="text-lg font-semibold">Privacidad y Consentimiento</h2>
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
  );
};

export default RegisterUserPatientForm;