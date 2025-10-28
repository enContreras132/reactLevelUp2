import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { productosData } from '../data/data';

export default function SearchDropdown({ items = null }) {
  const navigate = useNavigate();
  const allItems = items ?? productosData.map(p => p.nombre);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState(allItems);
  const ref = useRef(null);

  useEffect(() => {
    setResults(
      allItems.filter(it => it.toLowerCase().includes(query.toLowerCase()))
    );
  }, [query, allItems]);

  useEffect(() => {
    function onDocClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener('click', onDocClick);
    return () => document.removeEventListener('click', onDocClick);
  }, []);

  function onSelect(item) {
    // navegar a búsqueda o detalle; aquí ejemplo: ruta /search?q=...
    setOpen(false);
    setQuery('');
    navigate(`/search?q=${encodeURIComponent(item)}`);
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
            {results.length === 0 ? (
              <li className="list-group-item">No hay resultados</li>
            ) : (
              results.map((item) => (
                <li
                  key={item}
                  className="list-group-item list-group-item-action"
                  style={{ cursor: 'pointer' }}
                  onClick={() => onSelect(item)}
                >
                  {item}
                </li>
              ))
            )}
          </ul>
        </div>
      )}
    </div>
  );
}