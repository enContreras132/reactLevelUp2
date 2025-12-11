import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../context/CartContext';

export default function Productos() {
  const { addItem } = useCart();
  const [categoria, setCategoria] = useState("todos");
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    cargarProductos();
  }, []);

  const cargarProductos = async () => {
    try {
      setLoading(true);
      
      const API_URL = 'http://localhost:8080';
      
      // Llamadas paralelas a todas las APIs
      const [audifonosRes, mouseRes, tecladosRes, notebooksRes] = await Promise.all([
        axios.get(`${API_URL}/audifono`).catch(() => ({ data: [] })),
        axios.get(`${API_URL}/mouse`).catch(() => ({ data: [] })),
        axios.get(`${API_URL}/teclado`).catch(() => ({ data: [] })),
        axios.get(`${API_URL}/notebook`).catch(() => ({ data: [] }))
      ]);

      // Combinar todos los productos
      const todosProductos = [
        ...audifonosRes.data,
        ...mouseRes.data,
        ...tecladosRes.data,
        ...notebooksRes.data
      ];

      setProductos(todosProductos);
      setError(null);
    } catch (err) {
      console.error('Error al cargar productos:', err);
      setError('Error al cargar productos desde el servidor');
    } finally {
      setLoading(false);
    }
  };

  // Obtener categorías únicas de los productos
  const categorias = ["todos", ...new Set(productos.map(p => p.categoria).filter(Boolean))];

  // Filtrar productos por categoría
  const productosFiltrados = categoria === "todos" 
    ? productos 
    : productos.filter(p => p.categoria === categoria);

  if (loading) {
    return (
      <section className="food_section layout_padding-bottom">
        <div className="container">
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Cargando...</span>
            </div>
            <p className="mt-3">Cargando productos...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="food_section layout_padding-bottom">
        <div className="container">
          <div className="alert alert-danger" role="alert">
            {error}
            <button 
              className="btn btn-primary ms-3" 
              onClick={cargarProductos}
            >
              Reintentar
            </button>
          </div>
        </div>
      </section>
    );
  }

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
                      src={p.imagen || p.urlImagen || 'https://via.placeholder.com/400x300?text=Sin+imagen'}
                      alt={p.nombre}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'https://via.placeholder.com/400x300?text=Sin+imagen';
                      }}
                    />
                  </div>
                  <div className="detail-box flex-grow-1 d-flex flex-column">
                    <h5>{p.nombre}</h5>
                    {p.descripcion && <p>{p.descripcion}</p>}
                    <div className="options mt-auto">
                      <h6>${(p.precio || 0).toLocaleString('es-CL')}</h6>
                      <Link to={`/${p.categoria?.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')}/${encodeURIComponent(p.id)}`} className='btn btn-secondary'>Ver producto</Link>
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