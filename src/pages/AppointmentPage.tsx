import AppointmentForm from "@/components/forms/AppointmentForm";
import { useMobile } from "@/components/MobileProvider.tsx";

const Appointment = () => {
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

                    <AppointmentForm type='create'/>

                    <div className="text-14-regular mt-20 flex justify-between">
                        <p className="justify-items-end text-dark-600 xl:text-left">
                            © 2024 JakSof
                        </p>
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
}

export { Appointment };