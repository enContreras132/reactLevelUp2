import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as data from '../data/data';

// compatibilidad con distintos nombres de export en data.js
const productos = data.productosData ?? data.productos ?? [];
const pedidos = data.pedidos ?? [];

export default function Admin() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  const [view, setView] = useState('dashboard'); // 'dashboard' | 'productos' | 'pedidos'

  useEffect(() => {
    // Intentar leer sessionStorage primero, si no existe intentar localStorage
    const sessionRaw = sessionStorage.getItem('currentUser');
    const localRaw = localStorage.getItem('user');

    if (sessionRaw) {
      try {
        setCurrentUser(JSON.parse(sessionRaw));
        return;
      } catch {
        sessionStorage.removeItem('currentUser');
      }
    }

    if (localRaw) {
      // Repoblar sessionStorage desde localStorage para mantener la sesión entre navegaciones
      try {
        sessionStorage.setItem('currentUser', localRaw);
        setCurrentUser(JSON.parse(localRaw));
        return;
      } catch {
        // si falla, limpiar datos corruptos
        sessionStorage.removeItem('currentUser');
        localStorage.removeItem('user');
      }
    }

    // Si no hay usuario en ninguna storage, redirigir a login
    navigate('/login', { replace: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleLogout(e) {
    if (e && e.preventDefault) e.preventDefault();
    // Limpiar ambas fuentes de sesión para evitar inconsistencias
    sessionStorage.removeItem('currentUser');
    localStorage.removeItem('user');
    // Redirigir a la página principal
    navigate('/', { replace: true });
  }

  function renderDashboard() {
    return (
      <div>
        <div className="alert" style={{ backgroundColor: '#343a40', borderColor: '#00ffea', color: '#00ffea' }}>
          <h4>¡Bienvenido de vuelta, {currentUser?.nombre}!</h4>
          <p>Este es tu centro de control. Selecciona una opción del menú de la izquierda para empezar a gestionar la tienda.</p>
        </div>
      </div>
    );
  }

  function renderProductos() {
    return (
      <div>
        <h2 className="mb-3">Productos
        </h2>
        <div className="table-responsive">
          <table className="table table-hover table-dark">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Stock</th>
                <th>Precio</th>
              </tr>
            </thead>
            <tbody>
              {productos.map((p) => (
                <tr key={p.id}>
                  <td>{p.id}</td>
                  <td>{p.nombre}</td>
                  <td>
                    <span className={`badge ${p.stock < 10 ? 'bg-danger' : 'bg-success'}`}>
                      {p.stock ?? '—'}
                    </span>
                  </td>
                  <td>${(p.precio ?? 0).toLocaleString('es-CL')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  function renderPedidos() {
    return (
      <div>
        <h2 className="mb-3">Pedidos</h2>
        <div className="table-responsive">
          <table className="table table-hover table-dark">
            <thead>
              <tr>
                <th>ID Pedido</th>
                <th>Cliente</th>
                <th>Estado</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {pedidos.map((p) => (
                <tr key={p.id}>
                  <td>#{p.id}</td>
                  <td>{p.cliente}</td>
                  <td>
                    <span className="badge" style={{ backgroundColor: '#00ffea', color: '#212529' }}>
                      {p.estado}
                    </span>
                  </td>
                  <td>${(p.total ?? 0).toLocaleString('es-CL')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  if (!currentUser) return null; // evita render previo a la comprobación

  const { rol } = currentUser;

  return (
    <div className="d-flex">
      <nav id="sidebar" className="d-flex flex-column flex-shrink-0 p-3" style={{ minWidth: 250, background: '#0b1220', color: '#fff', height: '100vh' }}>
        <a href="#/" className="d-flex align-items-center mb-3 text-white text-decoration-none">
          <span className="fs-4">Level Up <span className="badge" style={{ backgroundColor: '#00ffea', color: '#212529' }}>Admin</span></span>
        </a>
        <hr style={{ borderColor: 'rgba(255,255,255,0.06)' }} />
        <ul id="sidebar-menu" className="nav nav-pills flex-column mb-auto">
          <li className="nav-item">
            <a href="#dashboard" className={`nav-link ${view === 'dashboard' ? 'active' : 'text-white'}`} onClick={(e) => { e.preventDefault(); setView('dashboard'); }}>
              <i className="bi bi-speedometer2 me-2"></i> Dashboard
            </a>
          </li>

          {(rol === 'admin' || rol === 'inventario') && (
            <li>
              <a href="#productos" className={`nav-link ${view === 'productos' ? 'active' : 'text-white'}`} onClick={(e) => { e.preventDefault(); setView('productos'); }}>
                <i className="bi bi-box-seam me-2"></i> Productos
              </a>
            </li>
          )}

          {(rol === 'admin' || rol === 'pedidos') && (
            <li>
              <a href="#pedidos" className={`nav-link ${view === 'pedidos' ? 'active' : 'text-white'}`} onClick={(e) => { e.preventDefault(); setView('pedidos'); }}>
                <i className="bi bi-receipt me-2"></i> Pedidos
              </a>
            </li>
          )}
        </ul>

        <hr style={{ borderColor: 'rgba(255,255,255,0.06)' }} />

        <div className="dropdown">
          <a href="#user" className="d-flex align-items-center text-white text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" onClick={(e) => e.preventDefault()}>
            <i className="bi bi-person-circle fs-4 me-2"></i>
            <strong id="user-name">{currentUser.nombre}</strong>
          </a>
          <ul className="dropdown-menu dropdown-menu-dark text-small shadow">
            <li><a className="dropdown-item" href="/" onClick={(e) => { e.preventDefault(); window.open('/', '_blank'); }}>Ver Sitio Principal</a></li>
            <li><hr className="dropdown-divider" /></li>
            <li><a className="dropdown-item" href="#logout" onClick={handleLogout}>Cerrar Sesión</a></li>
          </ul>
        </div>
      </nav>

      <main id="main-content" className="flex-grow-1 p-4" style={{ minHeight: '100vh', background: '#071021' }}>
        <h1 id="content-title" className="text-light mb-3">
          {view === 'dashboard' ? 'Dashboard' : view === 'productos' ? 'Gestión de Productos' : 'Gestión de Pedidos'}
        </h1>

        <div id="content-area" className="text-light">
          {view === 'dashboard' && renderDashboard()}
          {view === 'productos' && renderProductos()}
          {view === 'pedidos' && renderPedidos()}
        </div>
      </main>
    </div>
  );
}