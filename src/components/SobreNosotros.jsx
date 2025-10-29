function SobreNosotros() {
  return (
    <div>
      {/* about section */}
      <section className="about_section layout_padding">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <div className="img-box">
                <img src="/src/assets/images/logolevelup_1.png" alt="Logo Level Up" />
              </div>
            </div>
            <div className="col-md-6">
              <div className="detail-box">
                <div className="heading_container">
                  <h2>Sobre Level Up</h2>
                </div>
                <p>
                  Level-Up Gamer es una tienda online dedicada a satisfacer las necesidades de los entusiastas de los videojuegos en Chile. Lanzada hace dos años como respuesta a la creciente demanda durante la pandemia, Leves-Up Gamer ofrece una amplia gama de productos para gamers, desde consolas y accesorios hasta computadores y sillas especializadas. Aunque no cuenta con una ubicación física, realiza despachos a todo el país.
                </p>
                <a href="#">Leer Mas</a>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* end about section */}
    </div>
  );
}

export default SobreNosotros