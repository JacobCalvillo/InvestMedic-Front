import { useState, useEffect } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { CheckoutForm } from '../forms/StripeCheckoutForm';
import { useNavigate } from 'react-router-dom';
import { PaymentIntent, StripeError } from '@stripe/stripe-js';
import { getPaymentMethods } from "@/services/paymentMethod.service.ts";
import { PaymentMethod } from "@/models/PaymentMethod";
import { Select, SelectItem } from "@/components/ui/select.tsx";

interface PaymentDialogProps {
    isDialogOpen: boolean;
    setSelectedPaymentMethod: (method: string) => void;
    handleDialogClose: () => void;
    paymentMethod: string;
}

const PaymentDialog = ({ isDialogOpen, handleDialogClose, paymentMethod, setSelectedPaymentMethod }: PaymentDialogProps) => {
    const [cardForm, setCardForm] = useState<JSX.Element | null>(null);
    const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMethods = async () => {
            const methods = await getPaymentMethods();
            setPaymentMethods(methods);
        };

        if (isDialogOpen) fetchMethods();
    }, [isDialogOpen]);

    useEffect(() => {
        const handleSuccess = (paymentResult: PaymentIntent) => {
            console.log('Payment succeeded:', paymentResult);
            navigate('/success');
        };

        const handleError = (error: StripeError) => {
            console.error('Payment error:', error);
        };

        setCardForm(<CheckoutForm onSuccess={handleSuccess} onError={handleError} />);
    }, [navigate]);

    return (
        <Dialog open={isDialogOpen} onOpenChange={handleDialogClose}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{paymentMethod ? "Método de Pago Seleccionado" : "Método de Pago"}</DialogTitle>
                    <DialogDescription>
                        {paymentMethod ? "Rellena los detalles del pago" : "Selecciona el método de pago"}
                    </DialogDescription>

                    <Select
                        value={paymentMethod}
                        onValueChange={(value) => setSelectedPaymentMethod(value)}
                    >
                        {paymentMethods.map((method) => (
                            <SelectItem key={method.id} value={method.name}>
                                {method.name}
                            </SelectItem>
                        ))}
                    </Select>
                </DialogHeader>

                {/* Mostrar el formulario según el método de pago */}
                <div className="mt-4">
                    {paymentMethod === "Credit Card" && cardForm}
                    {paymentMethod === "PayPal" && <p>Redirigiendo a PayPal...</p>}
                </div>

                <DialogFooter>
                    <button type="button" onClick={handleDialogClose} className="bg-gray-500 text-white px-4 py-2 rounded">
                        Cancelar
                    </button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default PaymentDialog;
