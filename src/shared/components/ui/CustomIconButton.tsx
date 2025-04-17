import React from 'react';
import { Button } from '@/shared/components/ui/button.tsx';
import clsx from 'clsx';

interface ButtonProps {
    className?: string;
    icon?: React.ReactNode; // Icono opcional
    title: string;
    onClick?: () => void; // Manejador opcional
    disabled?: boolean; // Deshabilitar botón opcional
}

const CustomButton: React.FC<ButtonProps> = ({
    className = '',
    icon = null,
    title,
    onClick,
    disabled = false,
}) => {
    return (
        <Button
            type="button"
            onClick={onClick}
            disabled={disabled}
            className={clsx(
                'shad-primary-btn flex flex-col items-center justify-center gap-2 w-auto h-auto', // Diseño en columna
                { 'opacity-50 cursor-not-allowed': disabled },
                className
            )}
        >
            {icon && <span className="icon-wrapper text-2xl">{icon}</span>}
            <span className="text-sm font-medium">{title}</span>
        </Button>
    );
};

export default CustomButton;
