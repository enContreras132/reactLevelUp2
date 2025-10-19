import React from 'react';
import { Link } from 'react-router-dom';

export default function About() {
  return (
    <section className="about_section layout_padding">
      <div className="container  ">
        <div className="row">
          <div className="col-md-6 ">
            <div className="img-box">
              <img src="images/logolevelup (1).png" alt="" />
            </div>
          </div>
          <div className="col-md-6">
            <div className="detail-box">
              <div className="heading_container">
                <h2>Sobre Level Up</h2>
              </div>
              <p>
                Level Up es una tienda online, la cual vende productos tecnologicos como mouse, teclados, audifonos y computadores gamer
              </p>
              <Link to="/about">Leer Mas</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}