import RegisterUserPatientForm from "@/features/appointments/RegisterUserPatientForm.tsx";

const Patient = () => {
    return (
        <div className="flex py-16">
            <section className="remove-scroll-bar container my-auto flex w-full flex-col items-center">
                <div className="container max-w-[980px]">
                    <RegisterUserPatientForm  />
                </div>
            </section>
            
        </div>
        
    )
}

export { Patient }