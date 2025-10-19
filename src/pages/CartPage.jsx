import React from 'react';
// 1. Importamos el "hook" que creamos para usar el contexto
import { useCart } from '../context/CartContext';

function CartPage() {
    // 2. Nos "conectamos" al cerebro global y sacamos lo que necesitamos
    const { cart, removeItem, updateQuantity, clearCart, totalPrice } = useCart();

    // 3. Lógica de renderizado (Reemplaza a tu actualizarVistaDelCarrito())
    // Ya no usamos .innerHTML. Usamos JSX "declarativo".

    if (cart.length === 0) {
        return (
            <div className="container mx-auto p-4">
                <h1 className="text-3xl font-bold mb-4">Mi Carrito</h1>
                <p className="text-gray-400">Tu carrito está vacío.</p>
            </div>
        );
    }

    // Si el carrito NO está vacío
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">Mi Carrito</h1>
            
            {/* 4. "Dibujamos" los items del carrito usando .map() */}
            <div id="carrito" className="space-y-4 mb-4">
                {cart.map(item => (
                    // Este es el HTML que tenías en tu innerHTML
                    <div key={item.nombre} className="flex items-center justify-between bg-gray-900 bg-opacity-50 p-3 rounded-lg">
                        <div className="flex items-center space-x-4">
                            <img src={item.imagen} alt={item.nombre} className="w-16 h-12 rounded" />
                            <div>
                                <p className="font-semibold">{item.nombre}</p>
                                <p className="text-sm text-gray-400">Precio: ${item.precio.toLocaleString('es-CL')}</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-3">
                            {/* 5. Conectamos los inputs y botones a las funciones del contexto */}
                            <input
                                type="number"
                                min="1"
                                value={item.cantidad}
                                className="w-16 text-black rounded px-2 py-1"
                                // Reemplaza a tu listener de 'input'
                                onChange={(e) => updateQuantity(item.nombre, e.target.value)} 
                            />
                            <p className="w-20 text-right font-semibold">
                                ${ (item.precio * item.cantidad).toLocaleString('es-CL') }
                            </p>
                            <button
                                className="text-red-500 font-bold text-xl"
                                title="Eliminar"
                                // Reemplaza a tu listener de 'click' en .eliminar-btn
                                onClick={() => removeItem(item.nombre)}
                            >
                                &times;
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* 6. Mostramos el resumen y los botones */}
            <div className="flex justify-between items-center">
                <h2 id="resumen" className="text-2xl font-bold">
                    Total: ${totalPrice.toLocaleString('es-CL')}
                </h2>
                <div>
                    <button
                        id="vaciarCarrito"
                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded mr-2"
                        // Reemplaza a tu listener de vaciarBtn
                        onClick={clearCart}
                    >
                        Vaciar Carrito
                    </button>
                    <button
                        id="btnPagar"
                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
                    >
                        Pagar
                    </button>
                </div>
            </div>
        </div>
    );
}

export default CartPage;