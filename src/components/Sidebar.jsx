import React from 'react';
// 1. Importamos NavLink (para los links que se marcan como "activos")
import { NavLink, useNavigate, Link } from 'react-router-dom';
// 2. Importamos el "cerebro" de autenticación
import { useAuth } from '../context/AuthContext';
// 3. Importamos el componente Dropdown de react-bootstrap
import { Dropdown } from 'react-bootstrap';

function Sidebar() {
    // 4. Nos conectamos al "cerebro"
    const { currentUser, logout } = useAuth();
    const navigate = useNavigate();

    // 5. Reemplaza tu listener de 'logout-button'
    const handleLogout = (e) => {
        e.preventDefault();
        logout();
        navigate('/login'); // Redirigimos al login
    };

    // Si por alguna razón no hay usuario, no mostramos nada
    if (!currentUser) return null;

    const { rol, nombre } = currentUser;

    // 6. Este es tu <nav id="sidebar"> como componente JSX
    return (
        <nav id="sidebar" className="d-flex flex-column flex-shrink-0 p-3">
            
            {/* Tu logo/link principal */}
            <Link to="/paneladmin" className="d-flex align-items-center mb-3 text-white text-decoration-none">
                <span className="fs-4">Level Up 
                    <span className="badge" style={{ backgroundColor: '#00ffea', color: '#212529' }}>Admin</span>
                </span>
            </Link>
            <hr />

            {/* 7. Reemplazo de <ul id="sidebar-menu"> (la lógica de roles) */}
            <ul id="sidebar-menu" className="nav nav-pills flex-column mb-auto">
                <li className="nav-item">
                    {/* 'NavLink' añade la clase 'active' automáticamente */}
                    <NavLink to="/paneladmin" className="nav-link" end>
                        <i className="bi bi-speedometer2 me-2"></i>Dashboard
                    </NavLink>
                </li>
                
                {(rol === 'admin' || rol === 'inventario') && (
                    <li className="nav-item">
                        <NavLink to="/paneladmin/productos" className="nav-link">
                            <i className="bi bi-box-seam me-2"></i>Productos
                        </NavLink>
                    </li>
                )}
                
                {(rol === 'admin' || rol === 'pedidos') && (
                    <li className="nav-item">
                        <NavLink to="/paneladmin/pedidos" className="nav-link">
                            <i className="bi bi-receipt me-2"></i>Pedidos
                        </NavLink>
                    </li>
                )}
            </ul>
            <hr />

            {/* 8. Reemplazo de tu <div class="dropdown"> (con react-bootstrap) */}
            <Dropdown>
                <Dropdown.Toggle variant="dark" id="dropdown-user" className="d-flex align-items-center text-white text-decoration-none">
                    <i className="bi bi-person-circle fs-4 me-2"></i>
                    {/* Reemplazo de <strong id="user-name"> */}
                    <strong>{nombre}</strong>
                </Dropdown.Toggle>

                <Dropdown.Menu className="dropdown-menu-dark text-small shadow">
                    <Dropdown.Item as={Link} to="/">Ver Sitio Principal</Dropdown.Item>
                    <Dropdown.Divider />
                    {/* Reemplazo de <a id="logout-button"> */}
                    <Dropdown.Item onClick={handleLogout}>Cerrar Sesión</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>

        </nav>
    );
}

export default Sidebar;