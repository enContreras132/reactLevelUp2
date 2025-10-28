import React, { createContext, useContext, useEffect, useState } from 'react';
import * as data from '../data/data'; // usa data.productosData o data.productos
const productosSource = data.productosData ?? data.productos ?? [];

const CartContext = createContext();

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      // Leer 'cart' primero; si no existe, intentar 'carrito' (legacy)
      const raw = localStorage.getItem('cart') ?? localStorage.getItem('carrito');
      const parsed = raw ? JSON.parse(raw) : [];
      // Normalizar forma: { id, nombre, precio, imagen, qty }
      return parsed
        .map((it) => {
          if (!it) return null;
          const qty = it.qty ?? it.cantidad ?? it.cantidadProducto ?? 1;
          if (it.id) return { ...it, qty };
          // intentar resolver id buscando por nombre en productosData
          if (it.nombre) {
            const prod = productosSource.find((p) => p.nombre === it.nombre || String(p.id) === String(it.id));
            if (prod) return { id: prod.id, nombre: prod.nombre, precio: prod.precio, imagen: prod.imagen, qty };
            // fallback: mantener nombre como id string
            return { id: it.nombre, nombre: it.nombre, precio: it.precio ?? 0, imagen: it.imagen ?? '', qty };
          }
          return null;
        })
        .filter(Boolean);
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      // Guardar en ambas claves para compatibilidad con versiones antiguas
      localStorage.setItem('cart', JSON.stringify(items));
      localStorage.setItem('carrito', JSON.stringify(items));
    } catch {}
  }, [items]);

  const addItem = (product, qty = 1) => {
    setItems((cur) => {
      const found = cur.find((i) => String(i.id) === String(product.id));
      if (found) {
        return cur.map((i) => (String(i.id) === String(product.id) ? { ...i, qty: (i.qty || 1) + qty } : i));
      }
      return [...cur, { ...product, qty }];
    });
  };

  const removeItem = (id) => setItems((cur) => cur.filter((i) => String(i.id) !== String(id)));
  const updateQty = (id, qty) =>
    setItems((cur) => cur.map((i) => (String(i.id) === String(id) ? { ...i, qty } : i)));
  const clear = () => setItems([]);
  const total = items.reduce((s, i) => s + (i.precio || 0) * (i.qty || 1), 0);
  const count = items.reduce((s, i) => s + (i.qty || 1), 0);

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQty, clear, total, count }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}