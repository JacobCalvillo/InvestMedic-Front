import { useMobile } from "@/components/MobileProvider.tsx";

const Success = () => {
    const isMobile = useMobile();

    return (
        <div className={`flex ${isMobile ? 'flex-col' : 'flex-row'} h-screen max-h-screen px-[5%] bg-gray-100`}>
            <div className="container my-auto">
                <section className="flex flex-col items-center bg-white p-6 rounded-lg shadow-md">
                    <a href="/">
                        <img
                            src="/success.gif"
                            alt="success"
                            height={300}
                            width={280}
                            className="rounded-sm mb-6"
                        />
                    </a>
                    <h2 className="text-3xl font-bold mb-6 max-w-[600px] text-center text-green-600">
                        Tu <span className="text-green-500">Cita</span> Ha Sido Correctamente Registrada.
                    </h2>
                    <p className="text-center text-gray-700">Nos Pondremos En Contacto Contigo En Un Momento.</p>
                </section>
            </div>
        </div>
    );
}

export default Success;