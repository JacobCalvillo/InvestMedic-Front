import AppointmentForm from "@/components/forms/AppointmentForm"


const Appointment = () => {

    return (
        <div className="flex h-screen max-h-screen">
            <section className="remove-scroll-bar container my-auto flex w-full flex-col items-center">
                <div className="container max-w-[768px]">
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

            <img 
                src="/images/doctor.jpg"
                alt="doctor"
                width={1000}
                height={1000}
                className="side-img max-w-[390px] bg-bottom"
            />
        </div>
    )
}

export { Appointment }