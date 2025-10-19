import React from 'react';

// 1. Importamos los DATOS
import productosData from '../data/productos.js';

// 2. Importamos el "hook" del carrito para poder AÑADIR productos
import { useCart } from '../context/CartContext';

function ProductList() {
    // 3. Obtenemos la función "addItem" de nuestro "cerebro" (CartContext)
    const { addItem } = useCart();

    // 4. "Dibujamos" el componente
    return (
        <div className="product-grid"> {/* Un 'div' que envuelve todos los productos */}
            
            {/* 5. Usamos .map() para recorrer el array de datos
                y crear una "tarjeta" por cada producto */}
            {productosData.map((producto) => (
                
                // 6. 'key' es OBLIGATORIO en React para las listas
                <div key={producto.id} className="product-card"> 
                    
                    <img src={producto.imagen} alt={producto.nombre} className="product-image" />
                    
                    <div className="product-info">
                        <h3 className="product-name">{producto.nombre}</h3>
                        
                        <p className="product-price">
                            ${producto.precio.toLocaleString('es-CL')}
                        </p>
                        
                        {/* 7. El botón de AÑADIR AL CARRITO */}
                        <button 
                            className="btn-add-to-cart"
                            // Al hacer clic, llamamos a la función addItem
                            // pasándole el objeto "producto" completo
                            onClick={() => addItem(producto)} 
                        >
                            Añadir al Carrito
                        </button>
                    </div>
                </div>
            ))}
            
        </div>
    );
}

export default ProductList;