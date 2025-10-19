import React from 'react';
import { Link } from 'react-router-dom';

export default function Ofertas() {
  return (
    <section className="offer_section layout_padding-bottom">
      <div className="offer_container">
        <div className="container ">
          <div className="row">
            <div className="col-md-6  ">
              <div className="box ">
                <div className="img-box">
                  <img src="images/logolevelup (1).png" alt="" />
                </div>
                <div className="detail-box">
                  <h5>
                    Ofertas Por Registro con Correo de Duocuc 
                  </h5>
                  <h6>
                    <span>20%</span> Off
                  </h6>
                  <Link to="/book">
                    Compra Ahora
                    <svg viewBox="0 0 456.029 456.029"></svg>
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-md-6  ">
              <div className="box ">
                <div className="img-box">
                  <img src="images/logolevelup (1).png" alt="" />
                </div>
                <div className="detail-box">
                  <h5>
                    Ofertas Fin de Semana
                  </h5>
                  <h6>
                    <span>15%</span> Off
                  </h6>
                  <Link to="/book">
                    Compra Ahora
                    <svg viewBox="0 0 456.029 456.029"></svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}