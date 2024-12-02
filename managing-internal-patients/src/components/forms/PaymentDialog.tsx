import { useState, useEffect } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import CustomButton from '../CustomIconButton';
import { CiCreditCard1 } from "react-icons/ci";
import { BsCashCoin } from "react-icons/bs";
import { FaApplePay } from "react-icons/fa";
import { CheckoutForm } from './StripeCheckoutForm';
import { useNavigate } from 'react-router-dom';
import { PaymentIntent, StripeError } from '@stripe/stripe-js';

interface PaymentDialogProps {
    isDialogOpen: boolean;
    setSelectedPaymentMethod: (method: string) => void;
    handleDialogClose: () => void;
    paymentMethod: string;
}

const PaymentDialog = ({ isDialogOpen, handleDialogClose, paymentMethod, setSelectedPaymentMethod }: PaymentDialogProps) => {
    
    const [cardForm, setCardForm] = useState<JSX.Element | null>(null);
    const navigate = useNavigate();

    
    useEffect(() => {
        const handleSuccess = (paymentResult: PaymentIntent) => {
            console.log('Payment succeeded:', paymentResult);
            navigate('/success'); // Redirige a la página de éxito
          };
        
          const handleError = (error: StripeError) => {
            console.error('Payment error:', error);
          };
    
            setCardForm(
                <CheckoutForm onSuccess={handleSuccess} onError={handleError} />
            );
    }, [navigate]);

    return (
        <Dialog open={isDialogOpen} onOpenChange={handleDialogClose}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>
                        {paymentMethod ? "Método de Pago Seleccionado" : "Método de Pago"}
                    </DialogTitle>
                    <DialogDescription>
                        {paymentMethod ? "Rellena los detalles del pago" : "Selecciona el método de pago"}
                    </DialogDescription>
                    <div className="flex gap-2">
                        <CustomButton
                            icon={<CiCreditCard1 />}
                            className="text-white focus:ring-2 ring-white"
                            title="Tarjeta"
                            onClick={() => setSelectedPaymentMethod('card')}
                        />
                        <CustomButton
                            icon={<FaApplePay />}
                            className="text-white focus:ring-2 ring-white"
                            title="Apple Pay"
                            onClick={() => setSelectedPaymentMethod('applePay')}
                        />
                        <CustomButton
                            icon={<BsCashCoin />}
                            className="text-white focus:ring-2 ring-white"
                            title="Efectivo"
                            onClick={() => setSelectedPaymentMethod('cash')}
                        />
                    </div>
                </DialogHeader>

                <div>
                    {paymentMethod === 'card' && cardForm}
                    {paymentMethod === 'cash' && <p>Por favor, paga en efectivo en la recepción.</p>}
                    {paymentMethod === 'applePay' && <p>Apple Pay está en desarrollo.</p>}
                </div>

                <DialogFooter>
                    <button type="button" onClick={handleDialogClose}>
                        Cancelar
                    </button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default PaymentDialog;
