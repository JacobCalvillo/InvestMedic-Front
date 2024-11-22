import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import CustomButton from '../CustomIconButton';
import { useForm } from "react-hook-form";
import { CiCreditCard1 } from "react-icons/ci";
import { BsCashCoin } from "react-icons/bs";
import { FaApplePay } from "react-icons/fa";
import { Button } from '../ui/button';
import { Form } from "../ui/form";
import { PaymentValidation } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import CustomFormField from "../CustomFormField";
import { FormFieldType } from "@/constants";

interface PaymentDialogProps {
    isDialogOpen: boolean;
    setSelectedPaymentMethod: (method: string) => void;
    handleDialogClose: () => void;
    paymentMethod: string;
}

const PaymentDialog = ({ isDialogOpen, handleDialogClose, paymentMethod, setSelectedPaymentMethod }: PaymentDialogProps) => {

    const handleButtonClick = (method: string) => {
        setSelectedPaymentMethod(method);
    };

    const form = useForm<z.infer<typeof PaymentValidation>>({
        resolver: zodResolver(PaymentValidation),
        defaultValues: {
            cardNumber: "",
        },
    })

    const renderForm = () => {
        switch (paymentMethod) {
          case 'card':
            return (
                <Form {...form}>
                    <form action="">
                        <CustomFormField
                            control={form.control}
                            fieldType={FormFieldType.INPUT}
                            name="cardNumber"
                            label="Numero de tarjeta"
                        />
                    </form>
              </Form>
            );
          case 'applePay':
            return (
                <Form {...form}>
                    <form action="">
                        <label>Numero de tarjeta</label>
                        <input type="text" placeholder="Ingresa tu número de tarjeta" />
                        <label>Fecha de expiración</label>
                        <input type="text" placeholder="MM/AA" />
                    </form>
                </Form>
            );
          case 'cash':
            return (
                <Form {...form}>
                    <form action="">
                        <label>Numero de tarjeta</label>
                        <input type="text" placeholder="Ingresa tu número de tarjeta" />
                        <label>Fecha de expiración</label>
                        <input type="text" placeholder="MM/AA" />
                    </form>
                </Form>
            );
          default:
            return null;
        }
      };

    return (
        <Dialog open={isDialogOpen} onOpenChange={handleDialogClose}>
        <DialogTrigger asChild>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
            <DialogTitle>{paymentMethod ? "Método de Pago Seleccionado" : "Metodo de Pago"}</DialogTitle>
            <DialogDescription>
                {paymentMethod ? "Rellena los detalles del pago" : "Selecciona el metodo de pago"}
            </DialogDescription>
            <div className="flex flex-col gap-6 xl:flex-row">
                <div className="flex flex-col gap-4">
                <div className="flex gap-2">
                    <CustomButton 
                    icon={<CiCreditCard1 />}
                    className="text-white focus:ring-2 ring-white"
                    title="Tarjeta"
                    onClick={() => handleButtonClick('card')}
                    />
                    <CustomButton 
                    icon={<FaApplePay />}
                    className="text-white focus:ring-2 ring-white"
                    title="Apple Pay"
                    onClick={() => handleButtonClick('applePay')}
                    />
                    <CustomButton 
                    icon={<BsCashCoin />}
                    className="text-white focus:ring-2 ring-white"
                    title="Efectivo"
                    onClick={() => handleButtonClick('cash')}
                    />
                </div>
                </div>
            </div>
            </DialogHeader>

            <div>
                {renderForm()}
            </div>

            <DialogFooter>
            <Button
                type="button"
                onClick={handleDialogClose}
            >
                Cancelar
            </Button>
            <Button
                type="submit"
                onClick={handleDialogClose}
            >
                Confirmar
            </Button>
            </DialogFooter>
        </DialogContent>
        </Dialog>
    );
};

export default PaymentDialog;
