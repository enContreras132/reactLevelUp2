import React from "react";
import { Link } from "react-router-dom";

const Ofertas = () => {
  return (
    <section className="offer_section layout_padding-bottom">
      <div className="offer_container">
        <div className="container">
          <div className="row">
            <div className="col-md-6 d-flex">
              <div className="box w-100">
                <div className="img-box">
                  <img src="/src/assets/images/logolevelup_1.png" alt="Oferta Duocuc" />
                </div>
                <div className="detail-box">
                  <h5>Ofertas Por Registro con Correo de Duocuc</h5>
                  <h6>
                    <span>20%</span> Off
                  </h6>
                  <Link to="/productos">
                    Compra Ahora{" "}
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
                    ></svg>
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-md-6 d-flex">
              <div className="box w-100">
                <div className="img-box">
                  <img src="/src/assets/images/logolevelup_1.png" alt="Oferta Fin de Semana" />
                </div>
                <div className="detail-box">
                  <h5>Ofertas Fin de Semana</h5>
                  <h6>
                    <span>15%</span> Off
                  </h6>
                  <Link to="/productos">
                    Compra Ahora{" "}
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
                    ></svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Ofertas;