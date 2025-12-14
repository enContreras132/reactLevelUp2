import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SearchDropdown from "./MySearchDropdown.jsx";
import { useCart } from '../context/CartContext.jsx';
// He cambiado la extensión a .png según tu petición
import Logo from '../assets/images/logolevelupmini.png';

const Header = () => {
  const navigate = useNavigate();
  const { count } = useCart();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const sessionRaw = sessionStorage.getItem('currentUser');
    const localRaw = localStorage.getItem('user');

    if (sessionRaw) {
      try {
        setUser(JSON.parse(sessionRaw));
        return;
      } catch {
        sessionStorage.removeItem('currentUser');
      }
    }

    if (localRaw) {
      try {
        sessionStorage.setItem('currentUser', localRaw);
        setUser(JSON.parse(localRaw));
        return;
      } catch {
        sessionStorage.removeItem('currentUser');
        localStorage.removeItem('user');
      }
    }

    setUser(null);
  }, []);

  function handleLogout(e) {
    e && e.preventDefault();
    sessionStorage.removeItem('currentUser');
    localStorage.removeItem('user');
    setUser(null);
    navigate('/', { replace: true });
  }

  return (
    <header className="header_section">
      <div className="container">
        <nav className="custom_nav-container">
          <div className="header-top d-flex align-items-center">
            <div className="brand-wrapper d-flex align-items-center">
              <Link className="navbar-brand d-flex align-items-center flex-nowrap" to="/">
                <img
                  src={Logo}
                  alt="Level Up Logo"
                  className="img-fluid d-inline-block align-top"
                  style={{ maxHeight: 60, width: 'auto', marginRight: 12 }}
                />
                <span className="fw-bold d-none d-sm-inline">Level Up</span>
              </Link>
            </div>

            <div className="search-wrapper d-flex justify-content-center flex-grow-1">
              <SearchDropdown />
            </div>

            <div className="user-cart-wrapper d-flex align-items-center justify-content-end">
              <div className="user-block d-flex align-items-center">
                {user ? (
                  <div className="nav-item dropdown d-flex align-items-center">
                    <a href="#user" className="nav-link dropdown-toggle d-flex align-items-center user-inline" id="userDropdown" data-bs-toggle="dropdown" aria-expanded="false" onClick={(e) => e.preventDefault()}>
                      <i className="fa fa-user me-2 user-icon" aria-hidden="true"></i>
                      <div className="user-info text-start">
                        <div className="user-greet">Hola!</div>
                        <div className="user-name small">{user.nombre}</div>
                      </div>
                    </a>
                    <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
                      {user.rol === 'admin' && (
                        <>
                          <li><Link className="dropdown-item" to="/admin">Panel Admin</Link></li>
                          <li><hr className="dropdown-divider" /></li>
                        </>
                      )}
                      <li><button className="dropdown-item" onClick={handleLogout}>Cerrar sesión</button></li>
                    </ul>
                  </div>
                ) : (
                  <Link to="/login" className="user-link d-flex align-items-center text-decoration-none">
                    <i className="fa fa-user me-2 user-icon" aria-hidden="true"></i>
                    <div className="user-info text-start">
                      <div className="user-greet">Hola!</div>
                      <div className="user-login small">Inicia sesión</div>
                    </div>
                  </Link>
                )}
              </div>

              <div className="nav-sep mx-3" aria-hidden="true" />

              <div className="cart-block position-relative">
                <Link className="cart_link d-flex align-items-center" to="/cart" aria-label="Carrito">
                  <svg viewBox="0 0 456.029 456.029" style={{ enableBackground: "new 0 0 456.029 456.029" }} xmlSpace="preserve">
                    <path d="M0 24C0 10.7 10.7 0 24 0H69.5c10.3 0 19.4 6.6 22.6 16.4L96 32H552c13.3 0 24 10.7 24 24c0 2.6-.4 5.1-1.2 7.5l-72 240c-4.3 14.2-17.2 24-32 24H164.5l5.4 24H496c13.3 0 24 10.7 24 24s-10.7 24-24 24H152c-10.3 0-19.4-6.6-22.6-16.4L81.2 54.5 69.5 16H24C10.7 16 0 10.7 0 24zm160 400a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm288 0a48 48 0 1 1 96 0 48 48 0 1 1 -96 0z" />
                  </svg>
                  {count > 0 && <span className="badge bg-danger position-absolute cart-badge">{count}</span>}
                </Link>
              </div>
            </div>
          </div>

          <div className="main-nav text-center">
            <ul className="navbar-nav d-inline-flex">
              <li className="nav-item"><Link className="nav-link" to="/">Pagina Principal</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/productos">Productos</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/sobrenosotros">Nosotros</Link></li>
            </ul>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;