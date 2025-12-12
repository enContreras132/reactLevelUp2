import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

const CartContext = createContext();


const BASE_URL = "https://levelupapi-production.up.railway.app";

export function CartProvider({ children }) {
  const [productosSource, setProductosSource] = useState([]);

  useEffect(() => {
    const cargarProductos = async () => {
      try {
        
        const [audifonosRes, mouseRes, tecladosRes, notebooksRes] = await Promise.all([
          axios.get(`${BASE_URL}/audifono`).catch(() => ({ data: [] })),
          axios.get(`${BASE_URL}/mouse`).catch(() => ({ data: [] })),
          axios.get(`${BASE_URL}/teclado`).catch(() => ({ data: [] })),
          axios.get(`${BASE_URL}/notebook`).catch(() => ({ data: [] }))
        ]);
        const todos = [
          ...audifonosRes.data,
          ...mouseRes.data,
          ...tecladosRes.data,
          ...notebooksRes.data
        ];
        setProductosSource(todos);
      } catch (err) {
        console.error('Error al cargar productos en CartContext:', err);
      }
    };
    cargarProductos();
  }, []);

  
  const getInitialItems = () => {
     
     try {
      const currentRaw = localStorage.getItem('cart');
      const legacyRaw = localStorage.getItem('carrito');
      if (!currentRaw && legacyRaw) {
        localStorage.setItem('cart', legacyRaw);
        localStorage.removeItem('carrito');
      }
      const raw = localStorage.getItem('cart');
      const parsed = raw ? JSON.parse(raw) : [];
      return parsed
        .map((it) => {
          if (!it) return null;
          // normalizar cantidad y id (acepta diferentes formas de key)
          const cantidad = it.cantidad ?? it.qty ?? it.cantidadProducto ?? 1;
          const id = it.id ?? it._id ?? it.nombre ?? null;
          if (id) return { ...it, id, cantidad };
          return null;
        })
        .filter(Boolean);
    } catch {
      return [];
    }
  };

  const [items, setItems] = useState(getInitialItems);

  useEffect(() => {
    try {
      localStorage.setItem('cart', JSON.stringify(items));
    } catch {}
  }, [items]);

  const addItem = (product, cantidad = 1) => {
    setItems((cur) => {
      const prodId = product.id ?? product._id ?? product.nombre ?? null;
      const found = cur.find((i) => String(i.id ?? i._id ?? '') === String(prodId));
      if (found) {
        return cur.map((i) => (String(i.id ?? i._id ?? '') === String(prodId) ? { ...i, cantidad: (i.cantidad || i.qty || 1) + cantidad } : i));
      }
      // añadir item normalizando la propiedad id y cantidad
      return [...cur, { ...(product || {}), id: prodId, cantidad: cantidad }];
    });
  };

  const removeItem = (id) => setItems((cur) => cur.filter((i) => String(i.id ?? i._id ?? '') !== String(id)));
  const updateCantidad = (id, cantidad) =>
    setItems((cur) => cur.map((i) => (String(i.id ?? i._id ?? '') === String(id) ? { ...i, cantidad } : i)));
  const clear = () => setItems([]);
  const total = items.reduce((s, i) => s + (i.precio || i.price || 0) * (i.cantidad || i.qty || 1), 0);
  const count = items.reduce((s, i) => s + (Number(i.cantidad ?? i.qty ?? 1) || 0), 0);
  
  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateCantidad, clear, total, count }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}