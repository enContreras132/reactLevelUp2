
import React from "react";
import { Link } from "react-router-dom";
import "../assets/css/bootstrap.css";
import "../assets/css/style.css";


const HomePage = () => (
  <div className="container-fluid bg-light min-vh-100 p-0">
    {/* Slider principal */}
    <section className="py-5 bg-dark text-white">
      <div id="mainCarousel" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner">
          <div className="carousel-item active">
            <div className="row align-items-center">
              <div className="col-lg-6 px-5">
                <h1 className="display-4 fw-bold">Level Up</h1>
                <p className="lead">Level Up es una tienda online, la cual vende productos tecnológicos como mouse, teclados, audífonos y computadores gamer a precios accesibles para todos los usuarios.</p>
              </div>
            </div>
          </div>
          <div className="carousel-item">
            <div className="row align-items-center">
              <div className="col-lg-6 px-5">
                <h1 className="display-5">Oferta Semanal</h1>
                <p className="lead">Solo los días lunes por todas las semanas del año tendrás un 5% de descuento en todos nuestros productos.</p>
              </div>
            </div>
          </div>
          <div className="carousel-item">
            <div className="row align-items-center">
              <div className="col-lg-6 px-5">
                <h1 className="display-5">Oferta Por Registro con Correo de Duocuc</h1>
                <p className="lead">Por registrarte con tu correo de duocuc tendrás un 20% de descuento en todos nuestros productos.</p>
              </div>
            </div>
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#mainCarousel" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#mainCarousel" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </section>

    {/* Ofertas */}
    <section className="container py-5">
      <div className="row g-4">
        <div className="col-md-6">
          <div className="card shadow-sm h-100">
            <img src="/assets/images/logolevelup (1).png" className="card-img-top p-4" alt="Oferta Duocuc" />
            <div className="card-body">
              <h5 className="card-title">Ofertas Por Registro con Correo de Duocuc</h5>
              <h6 className="card-subtitle mb-2 text-success"><span>20%</span> Off</h6>
              <Link to="/book" className="btn btn-primary">Compra Ahora</Link>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card shadow-sm h-100">
            <img src="/assets/images/logolevelup (1).png" className="card-img-top p-4" alt="Oferta Fin de Semana" />
            <div className="card-body">
              <h5 className="card-title">Ofertas Fin de Semana</h5>
              <h6 className="card-subtitle mb-2 text-danger"><span>15%</span> Off</h6>
              <Link to="/book" className="btn btn-primary">Compra Ahora</Link>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* Separador visual */}
    <div className="container my-5">
      <div className="row align-items-center">
        <div className="col-md-7 mb-3 mb-md-0">
          <img src="https://images.unsplash.com/photo-1754820978711-611479056f97?..." alt="Separador" className="img-fluid rounded shadow" />
        </div>
        <div className="col-md-5">
          <h3 className="fw-bold">Los mejores productos</h3>
          <h3 className="fw-bold">Al mejor precio</h3>
        </div>
      </div>
    </div>

    {/* Sección Productos */}
    <section className="container py-5">
      <div className="text-center mb-4">
        <h2 className="fw-bold">Productos Disponibles</h2>
      </div>
      <div className="row g-4">
        {/* Ejemplo de producto */}
        <div className="col-sm-6 col-lg-4">
          <div className="card h-100 shadow-sm">
            <img src="https://i.bolder.run/r/czozMjIxLGc6NjkweA/477efa0d/711248-Mouse_B1.png" className="card-img-top p-4" alt="Mouse Gamer" />
            <div className="card-body d-flex flex-column">
              <h5 className="card-title">Mouse Gamer</h5>
              <p className="card-text small flex-grow-1">Mouse Gamer Monster<br />DPI:800/1600/2400/3200/4000/8000<br />RGB<br />Cable trenzado<br />Largo del cable 1.5m<br />6 Botones<br />Botón para modificar luces</p>
              <div className="d-flex justify-content-between align-items-center mt-2">
                <span className="fw-bold text-success">$7.590</span>
                <Link to="/producto/mousegamerMonster" className="btn btn-outline-primary btn-sm">Ver producto</Link>
              </div>
            </div>
          </div>
        </div>
        {/* Repite para cada producto... */}
      </div>
    </section>

    {/* About */}
    <section className="container py-5">
      <div className="row align-items-center">
        <div className="col-md-6 mb-3 mb-md-0">
          <img src="/assets/images/logolevelup (1).png" className="img-fluid rounded shadow" alt="Sobre Level Up" />
        </div>
        <div className="col-md-6">
          <h2 className="fw-bold mb-3">Sobre Level Up</h2>
          <p>Level Up es una tienda online, la cual vende productos tecnológicos como mouse, teclados, audífonos y computadores gamer.</p>
          <Link to="/about" className="btn btn-outline-dark">Leer Más</Link>
        </div>
      </div>
    </section>
  </div>
);

export default HomePage;
