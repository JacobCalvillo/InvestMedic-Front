import { useMobile } from "@/components/MobileProvider.tsx";
    import LoginForm from "@/components/forms/LoginForm";
    import { Link } from "react-router-dom";

    const Login = () => {
        const isMobile = useMobile();
        return (
            <div className={`flex ${isMobile ? 'flex-col' : 'md:flex-row'} h-screen max-h-screen`}>
                <section className="remove-scroll-bar container my-auto flex w-full md:w-1/2 flex-col items-center p-6">
                    <div className="container max-w-md">
                        <img
                            src="/logo.jpeg"
                            alt="logo"
                            width={100}
                            height={100}
                            className="mb-8 h-10 w-fit rounded-sm"
                        />
                        <LoginForm />
                        <div className="text-sm mt-10 flex flex-col md:flex-row justify-between items-center text-dark-600">
                            <p className="mb-2 md:mb-0">&copy; 2024 JakSof</p>
                            <div className="flex space-x-4">
                                <Link to="/" className="text-green hover:underline">
                                    Admin
                                </Link>
                                <Link to="/register" className="text-green hover:underline">
                                    Sign up
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

    export { Login };