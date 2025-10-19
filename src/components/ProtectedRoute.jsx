import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Navigate, Outlet } from 'react-router-dom';

function ProtectedRoute() {
    const { isAuthenticated } = useAuth(); // Obtenemos el estado de autenticación

    if (!isAuthenticated) {
        // Si no está logueado, lo "redirige" a la página de login
        return <Navigate to="/login" replace />;
    }

    // Si está logueado, le da permiso para ver el contenido (el <Outlet />)
    return <Outlet />;
}
export default ProtectedRoute;