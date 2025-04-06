import { Navigate, Outlet } from 'react-router-dom';
import { useUser } from '@/hooks/user-provider';

const ProtectedRoute = () => {
    const { isAuthenticated, loading } = useUser();

    // Mientras se verifica la autenticación, mostrar un indicador de carga
    if (loading) {
        return <div>Loading...</div>;
    }

    // Si no está autenticado, redirigir al login
    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }

    // Si está autenticado, mostrar las rutas protegidas
    return <Outlet />;
};

export default ProtectedRoute;