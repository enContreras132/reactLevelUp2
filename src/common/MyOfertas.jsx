import React from "react";
import { Link } from "react-router-dom";

const Ofertas = () => {
  return (
    <section className="py-5 my-5">
      <div className="container">
        {/* Título de la sección */}
        <div className="text-center mb-5">
          <h2 className="display-4 fw-bold mb-2">
            <i className="fa fa-gift me-3"></i>
            Ofertas Especiales
          </h2>
          <p className="lead">Aprovecha nuestras promociones exclusivas</p>
        </div>

        <div className="row g-4">
          {/* Oferta Principal - Duoc UC */}
          <div className="col-lg-6">
            <div className="card border-0 shadow-lg h-100 overflow-hidden" style={{ transition: 'transform 0.3s' }} onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-10px)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
              <div className="position-relative" >

                <div className="position-absolute top-0 end-0 m-3">
                  <span className="badge bg-danger fs-5 px-3 py-2 rounded-pill">
                    <i className="fa fa-percent me-1"></i>20% OFF
                  </span>
                </div>
              </div>
              <div className="card-body p-4">
                <div className="mb-3">
                  <span className="badge bg-primary mb-2">
                    <i className="fa fa-graduation-cap me-1"></i>
                    Estudiantes Duoc UC
                  </span>
                </div>
                <h4 className="card-title fw-bold mb-3">Descuento Especial Primera Compra</h4>
                <p className="card-text text-muted mb-4">
                  Registrate con tu correo institucional de Duoc UC y obtén un 20% de descuento en tu primera compra. 
                  ¡Válido para todos los productos!
                </p>
                <div className="d-flex gap-2">
                  <Link to="/registro" className="btn btn-primary flex-grow-1">
                    <i className="fa fa-user-plus me-2"></i>
                    Registrarme
                  </Link>
                  <Link to="/productos" className="btn btn-outline-primary">
                    <i className="fa fa-arrow-right"></i>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Ofertas Secundarias */}
          <div className="col-lg-6 d-flex">
            {/* Garantía Extendida */}
            <div className="w-100">
              <div className="card border-0 shadow h-100" style={{ transition: 'transform 0.3s' }} onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}>
                  <div className="card-body p-4 d-flex align-items-center">
                    <div className="me-4 text-center" style={{ width: '80px' }}>
                      <div className="rounded-circle bg-info bg-opacity-10 d-flex align-items-center justify-content-center" style={{ width: '80px', height: '80px' }}>
                        <i className="fa fa-shield fa-2x text-info"></i>
                      </div>
                    </div>
                    <div className="flex-grow-1">
                      <h5 className="card-title fw-bold mb-2">Garantía Extendida</h5>
                      <p className="card-text text-muted mb-0">12 meses en todos los productos gaming</p>
                    </div>
                    <div>
                      <span className="badge bg-info fs-6">12 Meses</span>
                    </div>
                  </div>
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