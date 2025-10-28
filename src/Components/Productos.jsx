import React from 'react';
import { Link } from 'react-router-dom';
import { productos } from '../data/data';
import { useCart } from '../context/CartContext';

export default function Productos() {
  const { addItem } = useCart();

  return (
    <section className="food_section layout_padding-bottom">
      <div className="container">
        <div className="heading_container heading_center">
          <h2>Productos Disponibles</h2>
        </div>

        <div className="filters-content">
          <div className="row grid">
            {productos.map((p) => (
              <div key={p.id} className="col-sm-6 col-lg-4 all">
                <div className="box">
                  <div className="img-box">
                    <img
                      src={p.imagen || 'https://via.placeholder.com/400x300?text=Sin+imagen'}
                      alt={p.nombre}
                    />
                  </div>
                  <div className="detail-box">
                    <h5>{p.nombre}</h5>
                    {p.descripcion && <p>{p.descripcion}</p>}
                    <div className="options">
                      <h6>${(p.precio || 0).toLocaleString('es-CL')}</h6>
                      <Link to={`/producto/${encodeURIComponent(p.id)}`}>Ver producto</Link>
                      <button
                        type="button"
                        onClick={() => addItem(p, 1)}
                        style={{ marginLeft: 8 }}
                      >
                        Añadir
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}