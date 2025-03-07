import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl } from "@/components/ui/form";
import CustomFormField from "../CustomFormField";
import SubmitButton from "../SubmitButton";
import { patientValidation } from "@/lib/validations/patient.validation.ts";
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from "../ui/label";
import { useNavigate } from "react-router-dom";
import IdentificationDialog from "../dialogs/IdentificationDialog";
import { FormFieldType, GenderOptions } from "@/constants";
import { useUser } from "@/hooks/user-provider";
import { registerPatient } from "@/services/patientService";
import { Patient } from "@/models/Patient.ts";
import { fileUploadDocuments, getFileDocumentsUrl } from "@/services/fileService";

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
      birthDate: new Date(Date.now()),
      gender: "Male",
      street: "",
      city: "",
      state: "",
      postalCode: "",
      occupation: "",
      emergencyContactName: "",
      emergencyContactLastName: "",
      emergencyContactNumber: "",
      emergencyContactRelationship: "",
      maritalStatus: "",
      identificationNumber: "",
      identificationType: "",
      identificationDocument: [],
      privacyConsent: false,
    },
  });

  const onSubmit = async (values: z.infer<typeof patientValidation>) => {
    setIsLoading(true);
    
    try {
      if (values.identificationDocument && values.identificationDocument.length > 0) {
        await fileUploadDocuments(
          values.identificationDocument[0],
            user.user.id
        );
      } else {
        console.error("Identification document is missing.");
      }
      
      const documentUrl = values.identificationDocument?.[0]
        ? await getFileDocumentsUrl(user.id, values.identificationDocument[0].name)
        : null;

      // 4. Crear paciente con la nueva identificación
      const newPatient: Patient = {
        name: values.name,
        lastName: values.lastName,
        birthDate: values.birthDate,
        gender: values.gender,
        street:values.street,
        city: values.city,
        state: values.state,
        postalCode: values.postalCode,
        occupation: values.occupation,
        emergencyContactName: values.emergencyContactName,
        emergencyContactLastName: values.emergencyContactLastName,
        emergencyContactRelationship: values.emergencyContactRelationship,
        emergencyContactNumber: values.emergencyContactNumber,
        maritalStatus: values.maritalStatus,
        privacyConsent: values.privacyConsent,
        userId: user.user.id
      }

      const patient = await registerPatient(
          newPatient,
          values.identificationNumber,
          documentUrl.image,
          values.identificationType
      );
      if (patient) {
        localStorage.setItem("patient", JSON.stringify(patient));
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
          <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="occupation"
              label="Ocupación"
              placeholder="Profesional"
          />
          <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="maritalStatus"
              label="Estado Civil"
              placeholder="Casado, Soltero, etc..."
          />
        </div>

        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="street"
            label="Calle"
            placeholder="Calle 123 Colonia 'example'"
          />
          <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="city"
              label="Ciudad"
              placeholder="Monterrey..."
          />
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="state"
            label="Estado"
            placeholder="Nuevo Leon"
          />
          <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="postalCode"
              label="Codigo Postal"
              placeholder="66633"
          />
        </div>

        <section className="space-y-6">
          <div className="mb-9 space-y-1">
            <h2 className="text-lg font-semibold">Informacion Contacto</h2>
          </div>
        </section>
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
            <IdentificationDialog control={form.control}/>
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