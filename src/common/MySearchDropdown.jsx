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
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const ref = useRef(null);

  useEffect(() => {
    const q = query.trim().toLowerCase();
    setResults(q ? allItems.filter(p => p.nombre.toLowerCase().includes(q)) : []);
  }, [query, allItems]);

  useEffect(() => {
    function onDocClick(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        // noop
      }
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
    <div ref={ref} className="site-search-container">
      <form
        className="site-search-form"
        onSubmit={(e) => {
          e.preventDefault();
          const q = query.trim();
          if (!q) return;
          const found = allItems.find(p => p.nombre.toLowerCase().includes(q.toLowerCase()));
          if (found) navigate(`/producto/${found.id}`);
        }}
      >
        <button type="submit" className="site-search-btn" aria-label="Buscar">
          <i className="fa fa-search"></i>
        </button>
        <input
          id="searchInput"
          className="site-search-input"
          placeholder="Busca los mejores productos y marcas :)"
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
      </form>
    </div>
  );
}