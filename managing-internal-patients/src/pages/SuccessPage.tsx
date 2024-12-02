
const Success = () => {
    return (
        <div className="flex h-screen max-h-screen px-[5%]">
            <div className="container my-auto">
                <section className="flex flex-col items-center">
                    <a href="/">
                        <img 
                            src="/success.gif" 
                            alt="success" 
                            height={300}
                            width={280}
                            className="rounded-sm "
                        />
                    </a>
                    <h2 className="text-3xl font-bold mb-6 max-w-[600px] text-center">
                        Tu <span className="text-green-500">Cita</span> Ha Sido Correctamente Registrada.
                    </h2>
                    <p>Nos Pondremos En Contacto Contigo En Un Momento.</p>
                </section>
                
                {/* <section className="">
                    <p>Detalles De La Cita: </p>
                    <div className="flex items-center gap-3">
                        <img 
                            src="" 
                            alt="" 
                        />
                    </div>
                </section> */}

            </div>
        </div>
    )
}

export default Success;