import { useState, useEffect } from 'react';
import { useStripe } from '@stripe/react-stripe-js';

export const PaymentStatus = () => {
    const stripe = useStripe();
    const [message, setMessage] = useState<string>('');

    useEffect(() => {
        if(!stripe) return;

        const clientSecret = new URLSearchParams(window.location.search).get(
            'payment_intent_client_secret'
        );

        stripe.retrievePaymentIntent(clientSecret || '').then(({ paymentIntent }) => {
            switch (paymentIntent?.status) {
                case 'requires_payment_method':
                    setMessage('Your payment was not successful, please try again.');
                    break;
                case 'requires_confirmation':
                    setMessage('Your payment is pending.');
                    break;
                case 'succeeded':
                    setMessage('Your payment completed.');
                    break;
                default:
                    setMessage('Something went wrong.');
                    break;
            }
        })
    }, [stripe]);

    return message
}