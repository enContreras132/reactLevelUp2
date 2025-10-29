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
    height: '800px',
    objectFit: 'contain'
  };

  return (
    <div id="carouselExample" className="carousel slide" data-bs-ride="carousel">
      <div className="carousel-inner mb-5">
        <div className="carousel-item active">
          <Link to="/producto/6">
            <img src="https://p4-ofp.static.pub//fes/cms/2025/05/22/bbh4okj51q0s8dnrsp89vypi3l1nmz317151.png" className="d-block w-100" alt="" style={carruselFit} />
            <h3 className="text-center bbh-sans-bartle-regular text-white">Legion M600</h3>
          </Link>
        </div>
        <div className="carousel-item">
          <Link to="/producto/5">
            <img src="https://media.spdigital.cl/thumbnails/products/8cj7010s_6fe796b6_thumbnail_4096.png" className="d-block w-100" alt="" style={carruselFit} />
            <h3 className="text-center bbh-sans-bartle-regular text-white">Kumara K-552</h3>
          </Link>
        </div>
        <div className="carousel-item">
          <Link to="/producto/3">
            <img src="src\assets\images\610-removebg-preview.png" className="d-block w-100" alt="" style={carruselFit} />
            <h3 className="text-center bbh-sans-bartle-regular text-white">Razer Cobra Pro HyperSpeed</h3>
          </Link>
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