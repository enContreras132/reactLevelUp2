import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="footer_section">
      <div className="container">
        <div className="row">
          <div className="col-md-4 footer-col">
            <div className="footer_contact">
              <h4>
                Nuestro Contacto
              </h4>
              <div className="contact_link_box">
                <Link to="/" >
                  <i className="fa fa-map-marker" aria-hidden="true"></i>
                  <span>
                    Ubicacion
                  </span>
                </Link>
                <Link to="/" >
                  <i className="fa fa-phone" aria-hidden="true"></i>
                  <span>
                    Numero +569 1234 5678
                  </span>
                </Link>
                <Link to="/" >
                  <i className="fa fa-envelope" aria-hidden="true"></i>
                  <span>
                    levelup@gmail.com
                  </span>
                </Link>
              </div>
            </div>
          </div>
          <div className="col-md-4 footer-col">
            <div className="footer_detail">
              <Link to="/" className="footer-logo">
                Level Up
              </Link>
              <p>
                Tambien puedes encontrarnos en las siguientes redes sociales 
              </p>
              <div className="footer_social">
                <Link to="/">
                  <i className="fa fa-facebook" aria-hidden="true"></i>
                </Link>
                <Link to="/">
                  <i className="fa fa-twitter" aria-hidden="true"></i>
                </Link>
                <Link to="/">
                  <i className="fa fa-linkedin" aria-hidden="true"></i>
                </Link>
                <Link to="/">
                  <i className="fa fa-instagram" aria-hidden="true"></i>
                </Link>
                <Link to="/">
                  <i className="fa fa-pinterest" aria-hidden="true"></i>
                </Link>
              </div>
            </div>
          </div>
          <div className="col-md-4 footer-col">
            <h4>
              Nuestro Horario de atención ejecutiva
            </h4>
            <p>
              Lunes a Viernes
            </p>
            <p>
              10.00 Am -19.00 Pm
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}