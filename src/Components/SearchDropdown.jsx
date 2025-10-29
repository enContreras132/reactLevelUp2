import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { productos } from '../data/data.js';

export default function SearchDropdown({ items = null }) {
  const navigate = useNavigate();
  const allItems = useMemo(() => (items ?? productos), [items]);
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