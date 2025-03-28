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
import { register } from "@/services/userService"
import { useNavigate } from "react-router-dom"
import { useUser } from "@/hooks/user-provider.tsx";
import { useMobile } from "@/components/MobileProvider.tsx";

const RegisterForm = () => {
  const navigate = useNavigate();
  const { setUser } = useUser() as unknown as { setUser: (user: User) => void };
  const [isLoading, setIsLoading] = React.useState(false);
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
    try {
      const newUser: User = {
        email: email,
        password: password,
        phone: phone,
        username: username
      };

      const user = await register(newUser);

      if (user) {
        setUser(user.user);
        navigate(`/patient/register`);
      }
    } catch (error) {
      console.log(error);
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