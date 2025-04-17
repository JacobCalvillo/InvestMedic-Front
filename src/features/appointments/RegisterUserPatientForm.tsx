import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl } from "@/shared/components/ui/form.tsx";
import CustomFormField from "../../shared/components/ui/CustomFormField.tsx";
import SubmitButton from "../../shared/components/ui/SubmitButton.tsx";
import { patientValidation } from "@/lib/validations/patient.validation.ts";
import { RadioGroup, RadioGroupItem } from '@/shared/components/ui/radio-group.tsx';
import { Label } from "@/shared/components/ui/label.tsx";
import { useNavigate } from "react-router-dom";
import IdentificationDialog from "../patients/components/dialogs/IdentificationDialog.tsx";
import { FormFieldType, GenderOptions } from "@/constants";
import { useUser } from "@/shared/hooks/user-provider.tsx";
import { registerPatient } from "@/features/patients/services/patientService.ts";
import { Patient } from "@/features/patients/types/Patient.ts";
import { fileUploadDocuments, getFileDocumentsUrl } from "@/services/fileService.ts";
import { useMobile } from "@/components/MobileProvider.tsx";
import { User } from "@/models/User.ts";
import { Button } from "@/shared/components/ui/button.tsx";

const RegisterUserPatientForm = () => {
  const { user } = useUser() as unknown as { user: User };
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [uploadStatus, setUploadStatus] = useState("");
  const [activeStep, setActiveStep] = useState(0);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [formValues, setFormValues] = useState<z.infer<typeof patientValidation> | null>(null);

  const navigate = useNavigate();
  const isMobile = useMobile();

  const steps = [
    "Información Personal",
    "Dirección",
    "Contacto de Emergencia",
    "Identificación y Consentimiento"
  ];

  // Cargar progreso guardado, si existe
  React.useEffect(() => {
    const savedValues = localStorage.getItem("patientFormDraft");
    if (savedValues) {
      try {
        const parsed = JSON.parse(savedValues);
        // Convertir cadenas de fecha a objetos Date
        if (parsed.birthDate) {
          parsed.birthDate = new Date(parsed.birthDate);
        }
        form.reset(parsed);
      } catch (error) {
        console.error("Error loading saved form:", error);
      }
    }
  }, []);

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

  const saveProgress = () => {
    const values = form.getValues();
    localStorage.setItem("patientFormDraft", JSON.stringify(values));
    // Mostrar feedback al usuario
    setUploadStatus("Progreso guardado correctamente");
    setTimeout(() => setUploadStatus(""), 3000);
  };

  const handlePreSubmit = (values: z.infer<typeof patientValidation>) => {
    setFormValues(values);
    setShowConfirmation(true);
  };

  const onSubmit = async (values: z.infer<typeof patientValidation>) => {
    setIsLoading(true);
    setError(null);
    setUploadStatus("");

    // Validación de documento
    if (!values.identificationDocument || values.identificationDocument.length === 0) {
      setError("El documento de identificación es obligatorio");
      setIsLoading(false);
      return;
    }

    try {
      // Manejo de carga de documentos
      try {
        setUploadStatus("Subiendo documento de identificación...");
        await fileUploadDocuments(
            values.identificationDocument[0],
            user.id
        );
      } catch (error) {
        console.error("Error al subir documento:", error);
        setError("Error al subir el documento. Por favor, intente nuevamente.");
        setIsLoading(false);
        return;
      }

      // Obtener URL del documento
      let documentUrl;
      try {
        setUploadStatus("Procesando documento...");
        documentUrl = await getFileDocumentsUrl(user.id, values.identificationDocument[0].name);
        if (!documentUrl || !documentUrl.image) {
          throw new Error("No se pudo obtener la URL del documento");
        }
      } catch (error) {
        console.error("Error al obtener URL del documento:", error);
        setError("Error al procesar el documento. Por favor, intente nuevamente.");
        setIsLoading(false);
        return;
      }

      // Preparar datos del paciente
      setUploadStatus("Registrando paciente...");
      const newPatient: Patient = {
        name: values.name,
        lastName: values.lastName,
        birthDate: values.birthDate,
        gender: values.gender,
        street: values.street,
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
        userId: user.id as number,
      };

      // Registrar paciente
      try {
        const patient = await registerPatient(
            newPatient,
            values.identificationNumber,
            documentUrl.image,
            values.identificationType
        );

        if (patient) {
          // Limpiar borrador guardado
          localStorage.removeItem("patientFormDraft");
          localStorage.setItem("patient", JSON.stringify(patient));
          navigate('/appointment');
        } else {
          throw new Error("No se recibió respuesta del servidor");
        }
      } catch (error) {
        console.error("Error al registrar paciente:", error);
        setError("Error al registrar los datos del paciente. Por favor, intente nuevamente.");
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Error en el proceso de registro:", error);
      setError("Ocurrió un error inesperado. Por favor, intente nuevamente más tarde.");
    } finally {
      setIsLoading(false);
      setUploadStatus("");
    }
  };

  return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handlePreSubmit)} className="space-y-8 flex-1 p-6 shadow-md rounded-lg">
          <section className="space-y-4">
            <h1 className="text-4xl font-bold text-center">Cuéntanos Más Sobre Ti</h1>
            {/* Indicador de progreso */}
            <div className="flex justify-between mb-6">
              {steps.map((step, index) => (
                  <button
                      key={index}
                      type="button"
                      onClick={() => setActiveStep(index)}
                      className={`px-4 py-2 rounded-full ${
                          activeStep === index
                              ? "bg-green-500 text-white"
                              : index < activeStep
                                  ? "bg-green-100 border border-green-500 text-green-700"
                                  : "bg-gray-100"
                      }`}
                  >
                    {index + 1}. {isMobile ? "" : step}
                  </button>
              ))}
            </div>
          </section>

          {/* Mensajes de error y estado */}
          {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
                <span className="block sm:inline">{error}</span>
                <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
              <button onClick={() => setError(null)} type="button">
                ×
              </button>
            </span>
              </div>
          )}

          {uploadStatus && (
              <div className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded">
                {uploadStatus}
              </div>
          )}

          {/* Paso 1: Información Personal */}
          {activeStep === 0 && (
              <>
                <section className="space-y-6">
                  <div className="mb-9 space-y-1">
                    <h2 className="text-lg font-semibold">Información Personal</h2>
                  </div>
                </section>

                <div className={`flex ${isMobile ? 'flex-col' : 'gap-4'}`}>
                  <CustomFormField
                      fieldType={FormFieldType.INPUT}
                      control={form.control}
                      name="name"
                      label={<>Nombre(s) <span className="text-red-500">*</span></>}
                      placeholder="John Doe"
                      iconSrc="/user-solid.svg"
                      iconAlt="user icon"
                  />

                  <CustomFormField
                      fieldType={FormFieldType.INPUT}
                      control={form.control}
                      name="lastName"
                      label={<>Apellidos <span className="text-red-500">*</span></>}
                      placeholder="John Doe"
                      iconSrc="/user-solid.svg"
                      iconAlt="user icon"
                  />
                </div>

                <div className={`flex ${isMobile ? 'flex-col' : 'gap-6 xl:flex-row'}`}>
                  <CustomFormField
                      fieldType={FormFieldType.DATEPICKER}
                      control={form.control}
                      iconSrc="/calendar-regular.svg"
                      iconAlt="calendar icon"
                      name="birthDate"
                      label={<>Fecha de Nacimiento <span className="text-red-500">*</span></>}
                  />

                  <CustomFormField
                      fieldType={FormFieldType.SKELETON}
                      control={form.control}
                      name="gender"
                      label={<>Género <span className="text-red-500">*</span></>}
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

                <div className={`flex ${isMobile ? 'flex-col' : 'gap-6 xl:flex-row'}`}>
                  <CustomFormField
                      fieldType={FormFieldType.INPUT}
                      control={form.control}
                      name="occupation"
                      label="Ocupación"
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
              </>
          )}

          {/* Paso 2: Dirección */}
          {activeStep === 1 && (
              <>
                <section className="space-y-6">
                  <div className="mb-9 space-y-1">
                    <h2 className="text-lg font-semibold">Dirección</h2>
                  </div>
                </section>

                <div className={`flex ${isMobile ? 'flex-col' : 'gap-6 xl:flex-row'}`}>
                  <CustomFormField
                      fieldType={FormFieldType.INPUT}
                      control={form.control}
                      name="street"
                      label={<>Calle <span className="text-red-500">*</span></>}
                      placeholder="Calle 123 Colonia 'example'"
                  />
                  <CustomFormField
                      fieldType={FormFieldType.INPUT}
                      control={form.control}
                      name="city"
                      label={<>Ciudad <span className="text-red-500">*</span></>}
                      placeholder="Monterrey..."
                  />
                </div>

                <div className={`flex ${isMobile ? 'flex-col' : 'gap-6 xl:flex-row'}`}>
                  <CustomFormField
                      fieldType={FormFieldType.INPUT}
                      control={form.control}
                      name="state"
                      label={<>Estado <span className="text-red-500">*</span></>}
                      placeholder="Nuevo Leon"
                  />
                  <CustomFormField
                      fieldType={FormFieldType.INPUT}
                      control={form.control}
                      name="postalCode"
                      label={<>Código Postal <span className="text-red-500">*</span></>}
                      placeholder="66633"
                  />
                </div>
              </>
          )}

          {/* Paso 3: Contacto de Emergencia */}
          {activeStep === 2 && (
              <>
                <section className="space-y-6">
                  <div className="mb-9 space-y-1">
                    <h2 className="text-lg font-semibold">Información de Contacto de Emergencia</h2>
                  </div>
                </section>

                <div className={`flex ${isMobile ? 'flex-col' : 'gap-6 xl:flex-row'}`}>
                  <CustomFormField
                      fieldType={FormFieldType.INPUT}
                      control={form.control}
                      name="emergencyContactName"
                      label={<>Nombre(s) de Contacto <span className="text-red-500">*</span></>}
                      placeholder="Guardians"
                  />

                  <CustomFormField
                      fieldType={FormFieldType.INPUT}
                      control={form.control}
                      name="emergencyContactLastName"
                      label={<>Apellidos de Contacto <span className="text-red-500">*</span></>}
                      placeholder="Guardians"
                  />
                </div>

                <div className={`flex ${isMobile ? 'flex-col' : 'gap-6 xl:flex-row'}`}>
                  <CustomFormField
                      fieldType={FormFieldType.PHONE_INPUT}
                      control={form.control}
                      name="emergencyContactNumber"
                      label={<>Teléfono de Contacto <span className="text-red-500">*</span></>}
                      placeholder="+54 11 1234 5678"
                  />

                  <CustomFormField
                      fieldType={FormFieldType.INPUT}
                      control={form.control}
                      name="emergencyContactRelationship"
                      label={<>Relación de Contacto <span className="text-red-500">*</span></>}
                      placeholder="Madre, Padre, etc..."
                  />
                </div>
              </>
          )}

          {/* Paso 4: Identificación y Consentimiento */}
          {activeStep === 3 && (
              <>
                <section className="space-y-6">
                  <div className="mb-9 space-y-1">
                    <h2 className="text-lg font-semibold">Identificación</h2>
                    <IdentificationDialog
                        control={form.control}

                    />
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
                    label={<>Consiento los datos de privacidad <span className="text-red-500">*</span></>}
                />
              </>
          )}

          {/* Botones de navegación entre pasos */}
          <div className="flex justify-between mt-6">
            <div>
              {activeStep > 0 && (
                  <Button
                      type="button"
                      variant="outline"
                      onClick={() => setActiveStep(prev => prev - 1)}
                  >
                    Anterior
                  </Button>
              )}
            </div>

            <div className="flex gap-2">
              <Button
                  type="button"
                  variant="outline"
                  onClick={saveProgress}
              >
                Guardar Progreso
              </Button>

              {activeStep < steps.length - 1 ? (
                  <Button
                      type="button"
                      onClick={() => setActiveStep(prev => prev + 1)}
                  >
                    Siguiente
                  </Button>
              ) : (
                  <SubmitButton isLoading={isLoading}>Registrar</SubmitButton>
              )}
            </div>
          </div>
        </form>

        {/* Modal de confirmación */}
        {showConfirmation && formValues && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded-lg max-w-md w-full dark:bg-gray-800">
                <h2 className="text-xl font-bold mb-4">Confirmar registro</h2>
                <p className="mb-4">¿Está seguro de que desea registrarse con estos datos?</p>

                <div className="max-h-60 overflow-y-auto mb-4">
                  <h3 className="font-semibold mb-2">Resumen:</h3>
                  <p><strong>Nombre:</strong> {formValues.name} {formValues.lastName}</p>
                  <p><strong>Fecha de nacimiento:</strong> {formValues.birthDate.toLocaleDateString()}</p>
                  <p><strong>Género:</strong> {formValues.gender}</p>
                  <p><strong>Dirección:</strong> {formValues.street}, {formValues.city}, {formValues.state}, {formValues.postalCode}</p>
                </div>

                <div className="flex justify-end gap-2">
                  <Button
                      variant="outline"
                      onClick={() => setShowConfirmation(false)}
                  >
                    Cancelar
                  </Button>
                  <Button
                      onClick={() => {
                        setShowConfirmation(false);
                        if (formValues) {
                          onSubmit(formValues);
                        }
                      }}
                  >
                    Confirmar
                  </Button>
                </div>
              </div>
            </div>
        )}
      </Form>
  );
};

export default RegisterUserPatientForm;