import React, { createContext, useState, useEffect, useContext, useMemo } from 'react';

// 1. Creamos el Contexto (el "cerebro" vacío)
export const CartContext = createContext();

// 2. Creamos el "Proveedor" del contexto (el componente que "envuelve" la app)
export const CartProvider = ({ children }) => {
    
    // 3. El ESTADO. Esta es la única "fuente de verdad".
    // Leemos localStorage AL INICIO, una sola vez.
    const [cart, setCart] = useState(() => {
        const localData = localStorage.getItem('carrito');
        return localData ? JSON.parse(localData) : [];
    });

    // 4. El EFECTO. Esto "escucha" los cambios en [cart] y actualiza localStorage.
    // Reemplaza a tu función guardarCarrito()
    useEffect(() => {
        localStorage.setItem('carrito', JSON.stringify(cart));
    }, [cart]);

    // --- FUNCIONES (Acciones que modifican el estado) ---

    // Esta función no la tenías en appcarrito.js, pero la necesitarás
    // para los botones de "Añadir al carrito" en tus productos.
    const addItem = (product, cantidad = 1) => {
        setCart(prevCart => {
            const existingItem = prevCart.find(item => item.nombre === product.nombre);

            if (existingItem) {
                // Si ya existe, actualiza la cantidad
                return prevCart.map(item =>
                    item.nombre === product.nombre
                        ? { ...item, cantidad: item.cantidad + cantidad }
                        : item
                );
            } else {
                // Si es nuevo, lo añade al array
                return [...prevCart, { ...product, cantidad }];
            }
        });
    };

    // Reemplaza a tu función eliminarDelCarrito()
    const removeItem = (nombreProducto) => {
        setCart(prevCart => prevCart.filter(item => item.nombre !== nombreProducto));
    };

    // Reemplaza a tu listener de 'input'
    const updateQuantity = (nombreProducto, nuevaCantidad) => {
        const cantidadNum = parseInt(nuevaCantidad);
        if (cantidadNum > 0) {
            setCart(prevCart =>
                prevCart.map(item =>
                    item.nombre === nombreProducto
                        ? { ...item, cantidad: cantidadNum }
                        : item
                )
            );
        }
    };

    // Reemplaza a tu listener de vaciarBtn
    const clearCart = () => {
        if (window.confirm('¿Estás seguro de que quieres vaciar el carrito?')) {
            setCart([]);
        }
    };

    // --- VALORES CALCULADOS (para el resumen) ---
    // Usamos useMemo para que no se recalculen en cada render, solo si [cart] cambia.
    
    const totalPrice = useMemo(() => {
        return cart.reduce((total, item) => total + (item.precio * item.cantidad), 0);
    }, [cart]);
    
    const totalItems = useMemo(() => {
        return cart.reduce((total, item) => total + item.cantidad, 0);
    }, [cart]);


    // 5. "Proveemos" el estado y las funciones a todos los componentes "hijos"
    const value = {
        cart,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        totalPrice,
        totalItems
    };
    
    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

// 6. (Opcional pero recomendado) Un "Hook" personalizado para usar el contexto más fácil
export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart debe ser usado dentro de un CartProvider');
    }
    return context;
};