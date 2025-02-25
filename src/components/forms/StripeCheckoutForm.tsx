import React, { useState } from 'react';
import SubmitButton from '../SubmitButton';
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';
import { PaymentIntent, StripeError } from '@stripe/stripe-js';

interface CheckoutFormProps {
  onSuccess?: (paymentResult: PaymentIntent) => void;
  onError?: (error: StripeError) => void;
}

export const CheckoutForm = ({ onSuccess, onError }: CheckoutFormProps) => {
  const stripe = useStripe();
  const elements = useElements();

  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: window.location.href, 
      },
      redirect: "if_required",
    });

    if (error) {
      setErrorMessage(error.message || 'Something went wrong.');
      onError?.(error); 
      return;
    }

    if (paymentIntent?.status === 'succeeded') {
      onSuccess?.(paymentIntent); // Llama al callback onSuccess, si está definido
    } else {
      setErrorMessage('Payment not completed. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <SubmitButton type="submit" isLoading={false}>Pagar</SubmitButton>
      {errorMessage && <div>{errorMessage}</div>}
    </form>
  );
};
