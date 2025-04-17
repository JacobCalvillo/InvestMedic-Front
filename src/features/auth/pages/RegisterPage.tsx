import { useMobile } from "@/components/MobileProvider.tsx";
import { Link } from "react-router-dom";
import RegisterForm from "../components/forms/RegisterForm.tsx";

const Register = () => {
    const isMobile = useMobile();
    return (
        <div className={`flex ${isMobile ? 'flex-col' : 'md:flex-row'} h-screen max-h-screen`}>
            <section className="remove-scroll-bar container my-auto flex w-full md:w-1/2 flex-col items-center p-6">
                <div className="container max-w-md">
                    <img
                        src='/logo.jpeg'
                        alt="logo"
                        width={100}
                        height={100}
                        className="mb-12 h-10 w-fit rounded-sm"
                    />
                    <RegisterForm />
                    <div className="text-14-regular mt-20 flex flex-col md:flex-row justify-between items-center text-dark-600">
                        <p className="mb-2 md:mb-0">© 2024 JakSof</p>
                        <div className="flex space-x-4">
                            <Link to="/" className="text-green hover:underline">
                                Admin
                            </Link>
                            <Link to="/login" className="text-green hover:underline">
                                Login
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
            <div className={`hidden md:block md:w-1/2`}>
                <img
                    src="/images/doctor.jpg"
                    alt="doctor"
                    className="w-full h-full object-cover"
                />
            </div>
        </div>
    );
};

export { Register };