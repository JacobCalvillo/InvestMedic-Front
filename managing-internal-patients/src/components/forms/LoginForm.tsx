import React from "react"
import { loginValidation } from "@/lib/validation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form } from "../ui/form"
import CustomFormField from "@/components/CustomFormField"
import { FormFieldType } from "../../constants/index"
import SubmitButton from "../SubmitButton"
import { login } from "@/services/userService"
import { useNavigate } from "react-router-dom"


const LoginForm = () => {

  const navigate = useNavigate();

  const [isLoading, setIsLoading] = React.useState(false)

  const form = useForm<z.infer<typeof loginValidation>>({
    resolver: zodResolver(loginValidation),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  // 2. Define a submit handler.
  async function onSubmit({ email, password}: z.infer<typeof loginValidation>) {
    setIsLoading(true);
    try {
      
      const user = await login(email, password);
      const token = user?.data.token;

      if (!token) {
        return;
      }

      if (user) {
        navigate('/dashboard');
      }

    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 flex-1">

        <section className="mb-12 space-y-4">
            <p className="text-3xl">Login</p>
        </section>


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
          label="Contraseña"
          placeholder="******"
          iconSrc="/lock-solid.svg"
          iconAlt="password"
        />
        
        <SubmitButton  isLoading={isLoading} >Login</SubmitButton>
      </form>
    </Form>
  )
}

export default LoginForm;