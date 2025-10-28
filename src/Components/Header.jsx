import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="header_section">
      <div className="container">
        <nav className="navbar navbar-expand-lg custom_nav-container">
          <Link className="navbar-brand" to="/">
            <span>Level Up</span>
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className=""></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mx-auto">
              <li className="nav-item active">
                <Link className="nav-link" to="/">
                  Pagina Principal <span className="sr-only">(current)</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/productos">
                  Productos
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/about">
                  Nosotros
                </Link>
              </li>
            </ul>

            <div className="user_option">
              <Link to="/usuario" className="user_link">
                <i className="fa fa-user" aria-hidden="true"></i>
              </Link>
              <Link className="cart_link" to="/carrito">
                <svg
                  version="1.1"
                  id="Capa_1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  x="0px"
                  y="0px"
                  viewBox="0 0 456.029 456.029"
                  style={{ enableBackground: "new 0 0 456.029 456.029" }}
                  xmlSpace="preserve"
                >
                  <path d="M0 24C0 10.7 10.7 0 24 0H69.5c10.3 0 19.4 6.6 22.6 16.4L96 32H552c13.3 0 24 10.7 24 24c0 2.6-.4 5.1-1.2 7.5l-72 240c-4.3 14.2-17.2 24-32 24H164.5l5.4 24H496c13.3 0 24 10.7 24 24s-10.7 24-24 24H152c-10.3 0-19.4-6.6-22.6-16.4L81.2 54.5 69.5 16H24C10.7 16 0 10.7 0 24zm160 400a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm288 0a48 48 0 1 1 96 0 48 48 0 1 1 -96 0z" />
                </svg>
              </Link>
              <div>
                <div className="dropdown-container">
                  <button id="btnSearch" className="btn btn-primary btn-sm">
                    Buscar
                  </button>
                  <div id="dropdownContent" className="dropdown-menu-custom">
                    <input
                      type="text"
                      id="searchInput"
                      className="form-control mb-2"
                      placeholder="Escribe para buscar..."
                    />
                    <ul
                      id="resultsList"
                      className="list-group"
                      style={{ maxHeight: "200px", overflowY: "auto" }}
                    ></ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;