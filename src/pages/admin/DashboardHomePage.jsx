import React from 'react';
import { useAuth } from '../../context/AuthContext'; // Importamos el "cerebro" de auth

function DashboardHomePage() {
    const { currentUser } = useAuth(); // Obtenemos el usuario

    return (
        <div>
            <h1 id="content-title">Dashboard</h1>
            <div className="alert alert-info" style={{ backgroundColor: '#343a40', border: '1px solid #00ffea', color: '#00ffea' }}>
                <h4>¡Bienvenido de vuelta, {currentUser.nombre}!</h4>
                <p>Este es tu centro de control. Selecciona una opción del menú de la izquierda para empezar a gestionar la tienda.</p>
            </div>
        </div>
    );
}
export default DashboardHomePage;