import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function Cart() {
  const { items, updateQty, removeItem, clear, total, count } = useCart();

  if (!items || items.length === 0) {
    return (
      <section className="cart_section">
        <div className="container">
          <h2>Tu carrito</h2>
          <p>No hay productos en el carrito.</p>
          <Link to="/productos">Ver productos</Link>
        </div>
      </section>
    );
  }

  return (
    <section className="cart_section">
      <div className="container">
        <h2>Tu carrito ({count})</h2>

        <div className="cart_list">
          {items.map((it) => (
            <div key={it.id} className="cart_item" style={{ display: 'flex', gap: 16, alignItems: 'center', marginBottom: 12 }}>
              <img
                src={it.imagen || 'https://via.placeholder.com/100x80?text=Sin+imagen'}
                alt={it.nombre}
                style={{ width: 100, height: 80, objectFit: 'cover' }}
              />
              <div style={{ flex: 1 }}>
                <h4 style={{ margin: 0 }}>{it.nombre}</h4>
                <p style={{ margin: 4 }}>Precio: ${ (it.precio || 0).toLocaleString('es-CL') }</p>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                  <button type="button" onClick={() => updateQty(it.id, Math.max(1, (it.qty || 1) - 1))}>-</button>
                  <span>{it.qty || 1}</span>
                  <button type="button" onClick={() => updateQty(it.id, (it.qty || 1) + 1)}>+</button>
                  <button type="button" onClick={() => removeItem(it.id)} style={{ marginLeft: 8 }}>Eliminar</button>
                  <Link to={`/producto/${encodeURIComponent(it.id)}`} style={{ marginLeft: 8 }}>Ver</Link>
                </div>
              </div>
              <div style={{ minWidth: 120, textAlign: 'right' }}>
                <strong>${ ((it.precio || 0) * (it.qty || 1)).toLocaleString('es-CL') }</strong>
              </div>
            </div>
          ))}
        </div>

        <div className="cart_footer" style={{ marginTop: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <button type="button" onClick={clear}>Vaciar carrito</button>
          </div>
          <div style={{ textAlign: 'right' }}>
            <p style={{ margin: 0 }}>Total: <strong>${ total.toLocaleString('es-CL') }</strong></p>
            <Link to="/checkout" style={{ display: 'inline-block', marginTop: 8 }}>Ir a pagar</Link>
          </div>
        </div>
      </div>
    </section>
  );
}