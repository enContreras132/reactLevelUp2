<<<<<<< Updated upstream
import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <>
      <header className="header_section">
        <div className="container">
          <nav className="navbar navbar-expand-lg custom_nav-container">
            <Link className="navbar-brand" to="/">
              <span>Level Up</span>
            </Link>
            <Link className="navbar-brand" to="/productos">
              Productos
            </Link>
            <div className="navbar-nav">
              <Link className="nav-item nav-link" to="/carrito">
                Carrito
              </Link>
            </div>

=======
import React from 'react';
// Importamos los componentes de react-router y react-bootstrap
import { Link, NavLink } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';

>>>>>>> Stashed changes

// CORRECCIÓN FINAL: Rutas relativas correctas desde la carpeta /components
import { useCart } from '../context/CartContext.jsx'; 
import SearchDropdown from './SearchDropdown.jsx'; 

function Header() {
    // Nos conectamos al cerebro del carrito para saber cuántos items hay
    const { totalItems } = useCart();

    return (
        <header className="header_section">
            <Container> {/* Container es de react-bootstrap, similar a tu 'container' */}
                <Navbar expand="lg" className="custom_nav-container">
                    
                    {/* Logo/Marca */}
                    <Navbar.Brand as={Link} to="/">
                        <span>Level Up</span>
                    </Navbar.Brand>

                    {/* Botón Hamburguesa (funciona automáticamente) */}
                    <Navbar.Toggle aria-controls="navbarSupportedContent" />

                    {/* Menú Colapsable */}
                    <Navbar.Collapse id="navbarSupportedContent">
                        
                        {/* Links de Navegación */}
                        <Nav className="mx-auto">
                            <Nav.Link as={NavLink} to="/" end>Pagina Principal</Nav.Link>
                            <Nav.Link as={NavLink} to="/productos">Productos</Nav.Link>
                            <Nav.Link as={NavLink} to="/about">Nosotros</Nav.Link>
                        </Nav>

                        {/* Opciones de Usuario */}
                        <div className="user_option">
                            <Link to="/login" className="user_link">
                                <i className="fa fa-user" aria-hidden="true"></i>
                            </Link>
                            <Link to="/carrito" className="cart_link">
                                {/* Tu SVG del carrito */}
                                <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 456.029 456.029" style={{ enableBackground: 'new 0 0 456.029 456.029' }} xmlSpace="preserve">
                                    <path d="M0 24C0 10.7 10.7 0 24 0H69.5c10.3 0 19.4 6.6 22.6 16.4L96 32H552c13.3 0 24 10.7 24 24c0 2.6-.4 5.1-1.2 7.5l-72 240c-4.3 14.2-17.2 24-32 24H164.5l5.4 24H496c13.3 0 24 10.7 24 24s-10.7 24-24 24H152c-10.3 0-19.4-6.6-22.6-16.4L81.2 54.5 69.5 16H24C10.7 16 0 10.7 0 24zm160 400a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm288 0a48 48 0 1 1 96 0 48 48 0 1 1 -96 0z"/>
                                </svg>
                                {/* Contador de Items */}
                                {totalItems > 0 && <span className="cart-count">{totalItems}</span>}
                            </Link>
                            
                            {/* Aquí usamos el componente de búsqueda que ya creamos */}
                            <SearchDropdown />
                        </div>
                    </Navbar.Collapse>
                </Navbar>
            </Container>
        </header>
    );
}

export default Header;

