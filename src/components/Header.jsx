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


            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className=""> </span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <div className="dropdown-container ml-auto">
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
                    style={{ maxHeight: 200, overflowY: "auto" }}
                  ></ul>
                </div>
              </div>
            </div>
          </nav>
        </div>

      </header>
    </>
  );
}