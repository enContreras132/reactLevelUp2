import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { productos as baseProductos } from '../data/data';
import { useCart } from '../context/CartContext';

export default function Productos() {
  const { addItem } = useCart();
  const [categoria, setCategoria] = useState("todos");

  // Mezclar productos base con los agregados por trabajador desde localStorage
  const productos = useMemo(() => {
    try {
      const raw = localStorage.getItem('customProductos');
      const custom = raw ? JSON.parse(raw) : [];
      return [...baseProductos, ...custom];
    } catch {
      return [...baseProductos];
    }
  }, []);

  // Obtener categorías únicas de los productos
  const categorias = ["todos", ...new Set(productos.map(p => p.categoria).filter(Boolean))];

  // Filtrar productos por categoría
  const productosFiltrados = categoria === "todos" 
    ? productos 
    : productos.filter(p => p.categoria === categoria);

  return (
    <section className="food_section layout_padding-bottom">
      <div className="container">
        <div className="heading_container heading_center mb-4">
          <h2>Productos Disponibles</h2>
        </div>

     {/* filtros */}
        <div className="filters-menu d-flex gap-2 mb-3 justify-content-center">
          {categorias.map(cat => (
            <button
              key={cat}
              className={`btn btn-sm ${categoria === cat ? 'btn-primary' : 'btn-outline-secondary'}`}
              onClick={() => setCategoria(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="filters-content">
          <div className="row grid">
            {productosFiltrados.map((p) => (
              <div key={p.id} className="col-sm-6 col-lg-4 all d-flex">
                <div className="box w-100 d-flex flex-column">
                  <div className="img-box">
                    <img
                      src={p.imagen || 'https://via.placeholder.com/400x300?text=Sin+imagen'}
                      alt={p.nombre}
                    />
                  </div>
                  <div className="detail-box flex-grow-1 d-flex flex-column">
                    <h5>{p.nombre}</h5>
                    {p.descripcion && <p>{p.descripcion}</p>}
                    <div className="options mt-auto">
                      <h6>${(p.precio || 0).toLocaleString('es-CL')}</h6>
                      <Link to={`/producto/${encodeURIComponent(p.id)}`} className='btn btn-secondary'>Ver producto</Link>
                      <button
                        type="button"
                        className="btn btn-primary"
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