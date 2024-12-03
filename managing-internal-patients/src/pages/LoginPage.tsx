import LoginForm from "@/components/forms/LoginForm"
import { Link } from "react-router-dom"


const Login = () => {
    return (
        <div className="flex h-screen max-h-screen">
            <section className="remove-scroll-bar container my-auto flex w-full flex-col items-center">
                <div className="container max-w-[496px]">
                    <img 
                        src='/logo.jpeg'
                        alt="logo"
                        width={100}
                        height={100}
                        className="mb-12 h-10 w-fit rounded-sm"
                     />

                    <LoginForm />

                    <div className="text-14-regular mt-20 flex justify-between">
                        <p className="justify-items-end text-dark-600 xl:text-left">
                            © 2024 JakSof
                        </p>
                        <Link to={"/"} className="text-green">
                            Admin
                        </Link>
                        <Link to={"/register"} className="text-green">
                            Sign up
                        </Link>
                    </div>
                </div>
            </section>

            <img 
                src="/images/doctor.jpg"
                alt="doctor"
                width={1000}
                height={1000}
                className="side-img max-w-[50%]"
            />
        </div>
    )
}

export { Login }