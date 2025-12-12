import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function Cart() {
  const { items, updateCantidad, removeItem, clear, total, count } = useCart();

  if (!items || items.length === 0) {
    return (
      <section className="cart_section py-5 footer_section">
        <div className="container">
          <div className="alert alert-info text-center text-dark" role="alert">
            <h4 className="alert-heading mb-2" style={{ color: '#000' }}>Tu carrito está vacío</h4>
            <p className="mb-3" style={{ color: '#000' }}>Aún no hay productos en el carrito.</p>
            <Link to="/productos" className="btn btn-primary">
              Ver productos
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="cart_section py-5 footer_section">
      <div className="container">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="h4 mb-0 text-white">Tu carrito</h2>
          <small className="text-light">Items: {count}</small>
        </div>

        <div className="row">
          <div className="col-12 col-lg-8">
            <div className="list-group">
              {items.map((it) => (
                <div
                  key={it.id}
                  className="list-group-item list-group-item-action mb-2 p-3 bg-transparent border-0"
                >
                  <div className="row g-3 align-items-center">
                    <div className="col-4 col-sm-3 col-md-2">
                      <img
                        src={it.imagen || 'https://via.placeholder.com/200x150?text=Sin+imagen'}
                        alt={it.nombre}
                        className="img-fluid rounded"
                      />
                    </div>

                    <div className="col-8 col-sm-6 col-md-7">
                      <h5 className="mb-1 text-white">{it.nombre}</h5>
                      <p className="mb-1 text-white small">
                        {it.descripcion ? it.descripcion.substring(0, 120) + (it.descripcion.length > 120 ? '...' : '') : ''}
                      </p>
                      <div className="d-flex align-items-center gap-2 mt-2">
                        <span className="fw-bold text-white">${((it.precio || 0) * (it.cantidad || 1)).toLocaleString('es-CL')}</span>
                        <small className="text-light">(${(it.precio || 0).toLocaleString('es-CL')} c/u)</small>
                      </div>
                    </div>

                    <div className="col-12 col-sm-3 col-md-3 text-md-end">
                      <div className="d-flex justify-content-md-end align-items-center gap-2">
                        <div className="input-group input-group-sm" style={{ width: 120 }}>
                          <button
                            className="btn btn-outline-light"
                            type="button"
                            onClick={() => updateCantidad(it.id, Math.max(1, (it.cantidad || 1) - 1))}
                          >
                            −
                          </button>
                          <input
                            className="form-control text-center bg-white"
                            value={it.cantidad || 1}
                            readOnly
                            aria-label="cantidad"
                          />
                          <button
                            className="btn btn-outline-light"
                            type="button"
                            onClick={() => updateCantidad(it.id, (it.cantidad || 1) + 1)}
                          >
                            +
                          </button>
                        </div>

                        <div className="d-flex flex-column">
                          <button className="btn btn-sm btn-danger mt-1" onClick={() => removeItem(it.id)}>
                            Eliminar
                          </button>
                          <Link to={`/producto/${encodeURIComponent(it.id)}`} className="btn btn-sm btn-link mt-2 text-white">
                            Ver
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <aside className="col-12 col-lg-4">
            <div className="card" style={{ top: '1rem' }}>
              <div className="card-body text-dark">
                <h5 className="card-title text-dark">Resumen</h5>
                <p className="card-text mb-2 text-dark">Productos: <strong className="text-dark">{count}</strong></p>
                <p className="card-text mb-3 text-dark">Total: <strong className="text-dark">${total.toLocaleString('es-CL')}</strong></p>
                <div className="d-grid gap-2">
                  <Link to="/checkout" className="btn btn-success btn-block">
                    Ir a pagar
                  </Link>
                  <button className="btn btn-outline-danger" onClick={clear}>
                    Vaciar carrito
                  </button>
                  <Link to="/productos" className="btn btn-secondary">
                    Seguir comprando
                  </Link>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}