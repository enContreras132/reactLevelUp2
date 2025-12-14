import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function SearchDropdown({ items = null }) {
  const navigate = useNavigate();
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const cargarProductos = async () => {
      try {
        const API_BASE = '/api';
        const [audifonosRes, mouseRes, tecladosRes, notebooksRes] = await Promise.all([
          axios.get(`${API_BASE}/audifono`).catch(() => ({ data: [] })),
          axios.get(`${API_BASE}/mouse`).catch(() => ({ data: [] })),
          axios.get(`${API_BASE}/teclado`).catch(() => ({ data: [] })),
          axios.get(`${API_BASE}/notebook`).catch(() => ({ data: [] }))
        ]);
        const todos = [
          ...audifonosRes.data,
          ...mouseRes.data,
          ...tecladosRes.data,
          ...notebooksRes.data
        ];
        setProductos(todos);
      } catch (err) {
        console.error('Error al cargar productos:', err);
      } finally {
        setLoading(false);
      }
    };
    cargarProductos();
  }, []);

  const allItems = useMemo(() => (items ?? productos), [items, productos]);

  useEffect(() => {
    const q = query.trim().toLowerCase();
    if (q.length > 0) {
      const filtered = allItems.filter(p => 
        p.nombre?.toLowerCase().includes(q) || 
        p.marca?.toLowerCase().includes(q) ||
        p.categoria?.toLowerCase().includes(q)
      );
      setResults(filtered.slice(0, 6)); // Muestrar máximo 6 resultados
      setShowDropdown(filtered.length > 0);
    } else {
      setResults([]);
      setShowDropdown(false);
    }
  }, [query, allItems]);

  useEffect(() => {
    function onDocClick(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener('click', onDocClick);
    return () => document.removeEventListener('click', onDocClick);
  }, []);

  function onSelect(product) {
    setShowDropdown(false);
    setQuery('');
    
    const categoria = product.categoria?.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '') || 'producto';
    navigate(`/${categoria}/${product.id}`);
  }

  function handleSubmit(e) {
    e.preventDefault();
    const q = query.trim();
    if (!q) return;
    
    if (results.length > 0) {
      // Si hay resultados, ir al primero usando su categoría
      const producto = results[0];
      const categoria = producto.categoria?.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '') || 'producto';
      navigate(`/${categoria}/${producto.id}`);
      setShowDropdown(false);
      setQuery('');
    }
  }

  return (
    <div ref={ref} className="site-search-container">
      <form className="site-search-form" onSubmit={handleSubmit}>
        <button type="submit" className="site-search-btn" aria-label="Buscar">
          <i className="fa fa-search"></i>
        </button>
        <input
          id="searchInput"
          className="site-search-input"
          placeholder="Busca los mejores productos y marcas :)"
          value={query}
          onChange={e => setQuery(e.target.value)}
          onFocus={() => query.length > 0 && results.length > 0 && setShowDropdown(true)}
        />
      </form>
      
      {showDropdown && (
        <div className="dropdown-menu-custom show">
          {results.map((product) => (
            <div
              key={product.id}
              className="dropdown-item-custom"
              onClick={() => onSelect(product)}
            >
              <div className="search-result-item">
                {product.imagen && (
                  <img
                    src={product.imagen}
                    alt={product.nombre}
                    className="search-result-img"
                  />
                )}
                <div className="search-result-info">
                  <div className="search-result-name">{product.nombre}</div>
                  {product.marca && (
                    <div className="search-result-brand">{product.marca}</div>
                  )}
                  <div className="search-result-price">
                    ${product.precio?.toLocaleString('es-CL')}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}