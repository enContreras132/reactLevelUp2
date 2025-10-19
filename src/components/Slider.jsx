
const Slider = () => {
  return (
    <section className="slider_section">
      {/* slider section */}
      <div id="customCarousel1" className="carousel slide" data-ride="carousel">
        <div className="carousel-inner">
          <div className="carousel-item active">
            <div className="container ">
              <div className="row">
                <div className="col-md-7 col-lg-6 ">
                  <div className="detail-box">
                    <h1>
                      Level Up
                    </h1>
                    <p>
                      Level Up es una tienda online, la cual vende productos tecnologicos como mouse, teclados, audifonos y computadores gamer a precios accesibles para todos los usuarios. {/* Alargue mas la descripcion */}
                    </p>
                    <div className="btn-box">
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="carousel-item ">
            <div className="container ">
              <div className="row">
                <div className="col-md-7 col-lg-6 ">
                  <div className="detail-box">
                    <h1>
                      Oferta Semanal
                    </h1>
                    <p>
                      Solo los dias lunes por todas las semanas del año tendras un 5% de descuento en todos nuestros productos
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="carousel-item">
            <div className="container ">
              <div className="row">
                <div className="col-md-7 col-lg-6 ">
                  <div className="detail-box">
                    <h1>
                      Oferta Por Registro con Correo de Duocuc
                    </h1>
                    <p>
                      Por Registrarte con tu correo de duocuc tendras un 20% de descuento en todos nuestros productos 
                    </p>
                    <div className="btn-box">
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <ol className="carousel-indicators">
            <li data-target="#customCarousel1" data-slide-to={0} className="active" />
            <li data-target="#customCarousel1" data-slide-to={1} />
            <li data-target="#customCarousel1" data-slide-to={2} />
          </ol>
        </div>
      </div>
      {/* end slider section */}
    </section>
  );
};

export default Slider;