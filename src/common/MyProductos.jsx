import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../context/CartContext';

// Función para truncar texto HTML
const truncateHTML = (html, maxLength = 100) => {
  if (!html) return '';
  // Crear un elemento temporal para extraer solo el texto
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = html;
  const text = tempDiv.textContent || tempDiv.innerText || '';
  
  if (text.length <= maxLength) return html;
  return text.substring(0, maxLength) + '<br><br> <strong>Presionar "ver producto" para más detalles...</strong>';
};

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
      console.log('🔄 Iniciando carga de productos...');
      
      const API_URL = 'http://localhost:8080';
      
      // Llamadas paralelas a todas las APIs
      const [audifonosRes, mouseRes, tecladosRes, notebooksRes] = await Promise.all([
        axios.get(`${API_URL}/audifono`).catch(err => {
          console.error('❌ Error audifono:', err.message);
          return { data: [] };
        }),
        axios.get(`${API_URL}/mouse`).catch(err => {
          console.error('❌ Error mouse:', err.message);
          return { data: [] };
        }),
        axios.get(`${API_URL}/teclado`).catch(err => {
          console.error('❌ Error teclado:', err.message);
          return { data: [] };
        }),
        axios.get(`${API_URL}/notebook`).catch(err => {
          console.error('❌ Error notebook:', err.message);
          return { data: [] };
        })
      ]);

      console.log('📦 Respuestas recibidas:', {
        audifonos: audifonosRes.data.length,
        mouse: mouseRes.data.length,
        teclados: tecladosRes.data.length,
        notebooks: notebooksRes.data.length
      });

      // Combinar todos los productos
      const todosProductos = [
        ...audifonosRes.data,
        ...mouseRes.data,
        ...tecladosRes.data,
        ...notebooksRes.data
      ];

      console.log('✅ Total productos cargados:', todosProductos.length);
      setProductos(todosProductos);
      setError(null);
    } catch (err) {
      console.error('💥 Error general al cargar productos:', err);
      setError('Error al cargar productos desde el servidor');
    } finally {
      console.log('🏁 Finalizando carga, setLoading(false)');
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
                  <div className="detail-box flex-grow-1 d-flex flex-column justify-content-space-around">
                    <h5>{p.nombre}</h5>
                    {p.descripcion && <p dangerouslySetInnerHTML={{ __html: truncateHTML(p.descripcion, 140) }}></p>}
                    <div className="options mt-auto d-flex flex-wrap gap-2 align-items-center">
                      <h6 className="btn btn-secondary mt-0">${(p.precio || 0).toLocaleString('es-CL')}</h6>
                      <Link to={`/${p.categoria?.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')}/${encodeURIComponent(p.id)}`} className='btn btn-secondary'>Ver producto</Link>
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={() => addItem(p, 1)}
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