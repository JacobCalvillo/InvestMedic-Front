import React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form } from "@/components/ui/form"
import CustomFormField from "../CustomFormField"
import SubmitButton from "../SubmitButton"
import { FormFieldType } from "@/constants"
import { registerValidation } from "@/lib/validations/register.validation.ts"
import { User } from "@/models/User"
import { useNavigate } from "react-router-dom"
import { useUser } from "@/hooks/user-provider.tsx";
import { useMobile } from "@/components/MobileProvider.tsx";

const RegisterForm = () => {
  const navigate = useNavigate();
  const { register } = useUser(); // Usamos la función register del contexto
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const isMobile = useMobile();

  const form = useForm<z.infer<typeof registerValidation>>({
    resolver: zodResolver(registerValidation),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      phone: "",
    },
  });

  async function onSubmit({ email, password, phone, username }: z.infer<typeof registerValidation>) {
    setIsLoading(true);
    setError(null);

    try {
      const newUser: User = {
        email,
        password,
        phone,
        username
      };

      const success = await register(newUser);

      if (success) {
        navigate(`/patient/register`);
      } else {
        setError("No se pudo completar el registro. Por favor intenta nuevamente.");
      }
    } catch (error) {
      console.error(error);
      setError("Ocurrió un error durante el registro");
    } finally {
      setIsLoading(false);
    }
  }

  return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className={`space-y-8 flex-1 p-6 ${isMobile ? 'shadow-md rounded-lg' : ''}`}>
          <section className="mb-12 space-y-4">
            <p className="text-3xl text-center">Registrate.</p>
          </section>

          {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                {error}
              </div>
          )}

          <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="username"
              label="Username"
              placeholder="John Doe"
              iconSrc="/user-solid.svg"
              iconAlt="user icon"
          />

          <CustomFormField
              fieldType={FormFieldType.PHONE_INPUT}
              control={form.control}
              name="phone"
              label="Numero Telefónico"
              placeholder="(81) 99999-9999"
          />

          <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="email"
              label="Email"
              placeholder="john.doe@me.com"
              iconSrc="/envelope-regular.svg"
              iconAlt="email"
          />

          <CustomFormField
              fieldType={FormFieldType.PASSWORD}
              control={form.control}
              name="password"
              label='Password'
              placeholder="******"
              iconSrc="/lock-solid.svg"
              iconAlt="password"
          />

          <SubmitButton isLoading={isLoading}>Sign Up</SubmitButton>
        </form>
      </Form>
  )
}

export default RegisterForm;