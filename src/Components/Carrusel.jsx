import React, { useEffect } from "react";

const Carrusel = () => {
  useEffect(() => {
    // Importar Bootstrap JS dinámicamente si no está cargado
    if (typeof window !== 'undefined' && window.bootstrap) {
      const carouselElement = document.querySelector('#carouselExample');
      if (carouselElement) {
        new window.bootstrap.Carousel(carouselElement, {
          interval: 3000, 
          ride: 'carousel'
        });
      }
    }
  }, []);

  const carruselFit = {
    height: '800px',
    objectFit: 'cover'
  };

  return (
    <div id="carouselExample" className="carousel slide" data-bs-ride="carousel">
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img 
            src="https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1120" 
            className="d-block w-100" 
            alt=""
            style={carruselFit}
          />
        </div>
        <div className="carousel-item">
          <img 
            src="https://images.unsplash.com/photo-1538481199705-c710c4e965fc?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1265" 
            className="d-block w-100" 
            alt=""
            style={carruselFit}
          />
        </div>
        <div className="carousel-item">
          <img 
            src="https://images.unsplash.com/photo-1534423861386-85a16f5d13fd?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170" 
            className="d-block w-100" 
            alt=""
            style={carruselFit}
          />
        </div>
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExample"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Anterior</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselExample"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Siguiente</span>
      </button>
    </div>
  );
};

export default Carrusel;