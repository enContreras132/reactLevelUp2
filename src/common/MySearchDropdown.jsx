import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function SearchDropdown({ items = null }) {
  const navigate = useNavigate();
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cargarProductos = async () => {
      try {
        const API_BASE = 'http://localhost:8080';
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
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const ref = useRef(null);

  useEffect(() => {
    const q = query.trim().toLowerCase();
    setResults(q ? allItems.filter(p => p.nombre.toLowerCase().includes(q)) : []);
  }, [query, allItems]);

  useEffect(() => {
    function onDocClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener('click', onDocClick);
    return () => document.removeEventListener('click', onDocClick);
  }, []);

  function onSelect(product) {
    setOpen(false);
    setQuery('');
    navigate(`/producto/${product.id}`);
  }

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      <button
        id="btnSearch"
        type="button"
        className="btn btn-outline-secondary"
        onClick={() => {
          setOpen(o => !o);
          setQuery('');
        }}
      >
        Buscar
      </button>

      {open && (
        <div id="dropdownContent" className="dropdown-menu show" style={{ display: 'block', minWidth: 240, padding: 8 }}>
          <input
            id="searchInput"
            className="form-control mb-2"
            placeholder="Buscar producto..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            autoFocus
          />
          <ul id="resultsList" className="list-group">
            {query.trim().length === 0
              ? null
              : results.length === 0
              ? (<li className="list-group-item">No hay resultados</li>)
              : results.map((item) => (
                  <li
                    key={item.id}
                    className="list-group-item list-group-item-action"
                    style={{ cursor: 'pointer' }}
                    onClick={() => onSelect(item)}
                  >
                    {item.nombre}
                  </li>
                ))}
          </ul>
        </div>
      )}
    </div>
  );
}