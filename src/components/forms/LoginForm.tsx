import React from "react"
import { loginValidation } from "@/lib/validations/login.validation.ts"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form } from "../ui/form"
import CustomFormField from "@/components/CustomFormField"
import { FormFieldType } from "@/constants"
import SubmitButton from "../SubmitButton"
import { useUser } from "@/hooks/user-provider" // Cambia la importación
import { useNavigate } from "react-router-dom"

const LoginForm = () => {
  const navigate = useNavigate();
  const { login } = useUser(); // Usa el hook de contexto
  const [isLoading, setIsLoading] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null);

  const form = useForm<z.infer<typeof loginValidation>>({
    resolver: zodResolver(loginValidation),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  async function onSubmit({ email, password}: z.infer<typeof loginValidation>) {
    setIsLoading(true);
    setError(null);

    try {
      const success = await login(email, password);

      if (success) {
        navigate('/user/page');
      } else {
        setError("Correo o contraseña incorrectos");
      }
    } catch (error) {
      console.error(error);
      setError("Ocurrió un error durante el inicio de sesión");
    } finally {
      setIsLoading(false);
    }
  }

  return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 flex-1">
          <section className="mb-12 space-y-4">
            <p className="text-3xl">Login</p>
          </section>

          {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                {error}
              </div>
          )}

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
              label="Contraseña"
              placeholder="******"
              iconSrc="/lock-solid.svg"
              iconAlt="password"
          />

          <SubmitButton isLoading={isLoading}>Login</SubmitButton>
        </form>
      </Form>
  )
}

export default LoginForm;