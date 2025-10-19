import React from 'react';
// NavLink es un <Link> especial que sabe si está "activo" o no
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; 

function Sidebar() {
    const { currentUser, logout } = useAuth(); // Sacamos el usuario y la función logout
    const navigate = useNavigate();

    // Reemplaza listener de logout
    const handleLogout = () => {
        logout(); // Llamamos a la función de logout del contexto
        navigate('/login'); // Redirigimos al login
    };

    // Si no hay usuario, no mostramos nada (aunque esto lo protegerá la ruta)
    if (!currentUser) return null; 

    const { rol, nombre } = currentUser;

    return (
        // Asumimos que tienes estilos para este sidebar
        <div id="sidebar" style={{ width: '250px', minHeight: '100vh', backgroundColor: '#343a40', color: 'white', padding: '15px' }}>
            <h3 id="user-name">{nombre}</h3>
            <hr />
            {/* Reemplaza tu sidebarMenu.innerHTML */}
            <ul id="sidebar-menu" className="nav flex-column">
                
                {/* Reemplaza <a data-view="dashboard">...</a> */}
                {/* 'end' le dice que solo esté activo en la ruta exacta */}
                <li className="nav-item">
                    <NavLink to="/paneladmin" className="nav-link text-white" end>
                        <i className="bi bi-speedometer2 me-2"></i>Dashboard
                    </NavLink>
                </li>
                
                {/* Lógica de Roles (reemplaza tu if (rol === ...)) */}
                {(rol === 'admin' || rol === 'inventario') && (
                    <li className="nav-item">
                        <NavLink to="productos" className="nav-link text-white">
                            <i className="bi bi-box-seam me-2"></i>Productos
                        </NavLink>
                    </li>
                )}
                
                {(rol === 'admin' || rol === 'pedidos') && (
                    <li className="nav-item">
                        <NavLink to="pedidos" className="nav-link text-white">
                            <i className="bi bi-receipt me-2"></i>Pedidos
                        </NavLink>
                    </li>
                )}
            </ul>
            <hr />
            <button id="logout-button" className="btn btn-danger" onClick={handleLogout}>
                Cerrar Sesión
            </button>
        </div>
    );
}
export default Sidebar;