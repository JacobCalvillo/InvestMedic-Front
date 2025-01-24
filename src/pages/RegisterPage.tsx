import { Link } from "react-router-dom"
import RegisterForm  from "../components/forms/RegisterForm"

const Register = () => {
    return(
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

                    <RegisterForm />

                    <div className="text-14-regular mt-20 flex justify-between">
                        <p className="justify-items-end text-dark-600 xl:text-left">
                            © 2024 JakSof
                        </p>
                        <Link to="" className="text-green" >
                            Admin
                        </Link>
                        <Link to="/login" className="text-green"> 
                            Login
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

export { Register }