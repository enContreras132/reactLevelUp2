import React, { useEffect } from "react";
import { Link } from "react-router-dom";

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
    height: '590px',
    objectFit: 'contain'
  };

  return (
    <div id="carouselExample" className="carousel slide mt-5" data-bs-ride="carousel">
      <div className="carousel-inner mb-5">
        <div className="carousel-item active">
          <Link to="/mouse/3000">
            <img src="https://i.bolder.run/r/czozMjIxLGc6NjkweA/477efa0d/711248-Mouse_B1.png" className="d-block w-100 mb-5" alt="Legion M600" style={carruselFit} />
          </Link>
          <h3 className="text-center bbh-sans-bartle-regular text-white">Mouse Gamer Monster</h3>
        </div>
        <div className="carousel-item">
          <Link to="/teclado/2000">
            <img src="https://media.spdigital.cl/thumbnails/products/8cj7010s_6fe796b6_thumbnail_4096.png" className="d-block w-100 img-hover-zoom mb-5" alt="Kumara K-552" style={carruselFit} />
          </Link>
          <h3 className="text-center bbh-sans-bartle-regular text-white">Kumara K-552</h3>
        </div>
        <div className="carousel-item">
          <Link to="/mouse/3001">
            <img src="src/assets/images/610-removebg-preview.png" className="d-block w-100 img-hover-zoom mb-5" alt="Razer Cobra Pro" style={carruselFit} />
          </Link>
          <h3 className="text-center bbh-sans-bartle-regular text-white">Razer Cobra Pro HyperSpeed</h3>
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
        <h2 className="text-center bbh-sans-bartle-regular">Elige nuestros mejores productos</h2>

    </div>
  );
};

export default Carrusel;