import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

import '../assets/css/style.css';  
function CartPage() {
    
    // 4. Nos conectamos al "cerebro" y sacamos lo que necesitamos
    const { cart, removeItem, updateQuantity, clearCart, totalPrice } = useCart();

    return (
        // 5. Empezamos a copiar tu HTML (pero en JSX)
        // No copiamos <body>, <head>, etc. Empezamos desde el contenido.
        // He movido las clases de tu <body> (p-6) a este div.
        <div className="min-h-screen p-6">

            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">

                {/* Columna del Carrito */}
                <section className="md:col-span-2">
                    <h2 className="text-2xl mb-4">Carrito de Compras</h2>
                    
                    {/* 6. AQUI VA LA MAGIA (Reemplazo de 'id="carrito"') */}
                    <div id="carrito" className="space-y-4">
                        
                        {/* 7. Lógica condicional de React */}
                        {cart.length === 0 ? (
                            
                            // Si el carrito está vacío, muestra tu HTML original
                            <p className="text-gray-400">Tu carrito está vacío.</p>

                        ) : (
                            
                            // Si el carrito tiene items, los "mapeamos" (dibujamos)
                            cart.map(item => (
                                // Este es el HTML que tu 'appcarrito.js' generaba
                                // Usamos 'key' para que React identifique cada item
                                <div key={item.id} className="flex items-center justify-between bg-gray-900 bg-opacity-50 p-3 rounded-lg">
                                    <div className="flex items-center space-x-4">
                                        <img src={item.imagen} alt={item.nombre} className="w-16 h-12 rounded" />
                                        <div>
                                            <p className="font-semibold">{item.nombre}</p>
                                            <p className="text-sm text-gray-400">Precio: ${item.precio.toLocaleString('es-CL')}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <input
                                            type="number"
                                            min="1"
                                            value={item.cantidad}
                                            className="w-16 text-black rounded px-2 py-1"
                                            // 8. Conectamos el input a la función del "cerebro"
                                            onChange={(e) => updateQuantity(item.nombre, e.target.value)}
                                        />
                                        <p className="w-20 text-right font-semibold">
                                            ${(item.precio * item.cantidad).toLocaleString('es-CL')}
                                        </p>
                                        <button
                                            className="text-red-500 font-bold text-xl"
                                            title="Eliminar"
                                            // 9. Conectamos el botón a la función del "cerebro"
                                            onClick={() => removeItem(item.nombre)}
                                        >
                                            &times;
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    {/* 10. Resumen y Botones (solo se muestran si el carrito NO está vacío) */}
                    {cart.length > 0 && (
                        <>
                            {/* Reemplazo de 'id="resumen"' */}
                            <div id="resumen" className="mt-6 text-right text-xl font-semibold">
                                Total: ${totalPrice.toLocaleString('es-CL')}
                            </div>

                            {/* Reemplazo de tu <a><button>...</button></a> */}
                            <Link to="/book"> 
                                <button id="btnPagar" className="btn-neon mt-4 px-6 py-3 rounded-lg">
                                    Pagar
                                </button>
                            </Link>
                            
                            {/* Reemplazo de 'id="vaciarCarrito"' */}
                            <button 
                                id="vaciarCarrito" 
                                className="btn-neon mt-6 px-6 py-3 rounded-lg"
                                // 11. Conectamos el botón a la función del "cerebro"
                                onClick={clearCart} 
                            >
                                Vaciar Carrito
                            </button>
                        </>
                    )}
                </section>
            </div>
        </div>
    );
}

export default CartPage;