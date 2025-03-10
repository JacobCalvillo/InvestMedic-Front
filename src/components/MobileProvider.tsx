import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Contexto para el MobileProvider
const MobileContext = createContext(false);

// Hook para usar el contexto
export const useMobile = () => {
    return useContext(MobileContext);
};

// MobileProvider
interface MobileProviderProps {
    children: ReactNode;  // Aseguramos que children es del tipo ReactNode
}

export const MobileProvider: React.FC<MobileProviderProps> = ({ children }) => {
    const [isMobile, setIsMobile] = useState<boolean>(false);

    const handleResize = () => {
        setIsMobile(window.innerWidth < 768); // 768px es el tamaño típico de los dispositivos móviles
    };

    useEffect(() => {
        handleResize(); // Verificar el tamaño al cargar la página
        window.addEventListener('resize', handleResize); // Escuchar los cambios de tamaño

        return () => {
            window.removeEventListener('resize', handleResize); // Limpiar el listener
        };
    }, []);

    return (
        <MobileContext.Provider value={isMobile}>
            {children}
        </MobileContext.Provider>
    );
};
