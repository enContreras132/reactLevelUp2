import React, { createContext, useContext, useEffect, useState } from 'react';
import * as data from '../data/data'; // usa data.productosData o data.productos
const productosSource = data.productosData ?? data.productos ?? [];

const CartContext = createContext();

export function CartProvider({ children }) {
  const getInitialItems = () => {
    try {
      // Migrar clave legacy 'carrito' a 'cart' si aún existe
      const currentRaw = localStorage.getItem('cart');
      const legacyRaw = localStorage.getItem('carrito');
      if (!currentRaw && legacyRaw) {
        // mover datos legacy a la nueva clave y eliminar legacy
        localStorage.setItem('cart', legacyRaw);
        localStorage.removeItem('carrito');
      }
      // Leer desde la clave canonica 'cart'
      const raw = localStorage.getItem('cart');
      const parsed = raw ? JSON.parse(raw) : [];
      // Normalizar forma: { id, nombre, precio, imagen, cantidad }
      return parsed
        .map((it) => {
          if (!it) return null;
          const cantidad = it.cantidad ?? it.cantidad ?? it.cantidadProducto ?? 1;
          if (it.id) return { ...it, cantidad: cantidad };
          // intentar resolver id buscando por nombre en productosData
          if (it.nombre) {
            const prod = productosSource.find((p) => p.nombre === it.nombre || String(p.id) === String(it.id));
            if (prod) return { id: prod.id, nombre: prod.nombre, precio: prod.precio, imagen: prod.imagen, cantidad: cantidad };
            // fallback: mantener nombre como id string
            return { id: it.nombre, nombre: it.nombre, precio: it.precio ?? 0, imagen: it.imagen ?? '', cantidad: cantidad };
          }
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
      // Escribir solo en la clave canonical 'cart' (la migración ya se hizo en init)
      localStorage.setItem('cart', JSON.stringify(items));
    } catch {}
  }, [items]);

  const addItem = (product, cantidad = 1) => {
    setItems((cur) => {
      const found = cur.find((i) => String(i.id) === String(product.id));
      if (found) {
        return cur.map((i) => (String(i.id) === String(product.id) ? { ...i, cantidad: (i.cantidad || 1) + cantidad } : i));
      }
      return [...cur, { ...product, cantidad: cantidad }];
    });
  };

  const removeItem = (id) => setItems((cur) => cur.filter((i) => String(i.id) !== String(id)));
  const updateCantidad = (id, cantidad) =>
    setItems((cur) => cur.map((i) => (String(i.id) === String(id) ? { ...i, cantidad } : i)));
  const clear = () => setItems([]);
  const total = items.reduce((s, i) => s + (i.precio || 0) * (i.cantidad || 1), 0);
  const count = items.reduce((s, i) => s + (i.cantidad || 1), 0);
  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateCantidad, clear, total, count }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}