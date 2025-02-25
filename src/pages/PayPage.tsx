import { useLocation } from "react-router-dom";
import { CheckoutForm } from "@/components/forms/StripeCheckoutForm";
import { loadStripe, StripeElementsOptions } from "@stripe/stripe-js";
import { getStripeClientSecret } from "@/services/stripeService.ts";
import { Elements } from "@stripe/react-stripe-js";
import { getServiceById } from "@/services/servicesService.ts";
import { useEffect, useState } from "react";
import {Appointment} from "@/models/Appointment.ts";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK as string);

const Paypage = () => {
    const { state }: Appointment = useLocation();
    const serviceId: number = state?.service_id;
    console.log(serviceId);
    const [service, setService] = useState<Appointment>();
    const [clientSecret, setClientSecret] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            if (!serviceId) {
                console.log("No service id");
                return;
            }

            try {
                const serviceData = await getServiceById(serviceId);
                setService(serviceData);

                const formattedPrice = parseInt(serviceData.price, 10) * 100;
                const client = await getStripeClientSecret(formattedPrice, 'mxn');
                setClientSecret(client);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, [serviceId]);

    const clientOptions: StripeElementsOptions | undefined = clientSecret
        ? { clientSecret, appearance: { theme: 'night', labels: 'floating' } }
        : undefined;

    return (
        <div className="w-full">
            <section className="remove-scroll-bar container my-auto flex w-full flex-col items-center">
                <div className="container max-w-[496px]">
                    {clientSecret ? (
                        <Elements stripe={stripePromise} options={clientOptions}>
                            <CheckoutForm />
                        </Elements>
                    ) : (
                        <p>Cargando información de pago...</p>
                    )}
                </div>
            </section>
        </div>
    );
};

export default Paypage;
