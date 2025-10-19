import React, { useState } from 'react';
// 1. Importamos los "hooks" necesarios
import { useParams, Link } from 'react-router-dom'; // Para leer el ID de la URL
import { useCart } from '../context/CartContext';    // Para el botón "Añadir al Carrito"

// 2. Importamos tu base de datos de productos
import productosData from '../data/productos.js';

function ProductDetailPage() {
    // 3. Obtenemos el "productId" de la URL (ej. "/producto/1")
    // (Asegúrate de que tu ruta en App.jsx sea "/producto/:productId")
    const { productId } = useParams();

    // 4. Buscamos el producto en tu array de datos
    // Usamos parseInt() porque el ID de tu array es número y el de la URL es texto
    const product = productosData.find(p => p.id === parseInt(productId));

    // 5. Conectamos con el "cerebro" del carrito
    const { addItem } = useCart();

    // 6. Creamos un "estado" local para la cantidad
    const [cantidad, setCantidad] = useState(1);

    // 7. Si el producto no existe (ej. /producto/999), mostramos un error
    if (!product) {
        return (
            <div className="container my-5 text-center">
                <h2>Producto no encontrado</h2>
                <Link to="/">Volver a la tienda</Link>
            </div>
        );
    }

    // 8. Si el producto SÍ existe, "dibujamos" la página
    // (Este es tu HTML, pero "dinámico")
    return (
        // Reemplazamos <div class="container my-5">
        <div className="container my-5">
            <div className="row">
                <div className="col-lg-6">
                    {/* --- DATO DINÁMICO --- */}
                    <img src={product.imagen} alt={product.nombre} className="img-fluid producto-imagen-principal" />
                </div>
                <div className="col-lg-6 producto-info">
                    {/* --- DATO DINÁMICO --- */}
                    <h1>{product.nombre}</h1>
                    
                    {/* --- DATO DINÁMICO --- */}
                    <p className="lead">{product.descripcion}</p>
                    
                    {/* --- DATO DINÁMICO --- */}
                    <div className="producto-precio">${product.precio.toLocaleString('es-CL')}</div>
                    
                    <h5>Características Principales:</h5>
                    {/* --- DATO DINÁMICO (MAPEADO) --- */}
                    <ul className="list-unstyled">
                        {product.caracteristicas.map((caracteristica, index) => (
                            <li key={index}>
                                <i className="fas fa-check-circle text-success"></i> {caracteristica}
                            </li>
                        ))}
                    </ul>
                    <hr />
                    <div className="d-flex align-items-center mt-4">
                        {/* 9. Conectamos el input al estado "cantidad" */}
                        <input 
                            type="number" 
                            id="cantidad" 
                            className="form-control cantidad-input" 
                            value={cantidad} 
                            min="1"
                            onChange={(e) => setCantidad(parseInt(e.target.value))}
                        />
                        {/* 10. Conectamos el botón al "cerebro" del carrito */}
                        <button 
                            id="btnAnadirCarrito" 
                            className="btn btn-primary btn-lg btn-carrito"
                            onClick={() => {
                                addItem(product, cantidad); // Usa la función del contexto
                                alert('¡Producto añadido al carrito!'); // (Opcional)
                            }}
                        >
                            Añadir al Carrito <i className="fas fa-shopping-cart"></i>
                        </button>
                    </div>
                </div>
            </div>
            <div className="row seccion-detalles">
                <div className="col-12">
                    <h3>Descripción Completa</h3>
                    {/* --- DATO DINÁMICO --- */}
                    <p>{product.descripcion}</p>
                    
                    <h4 className="mt-4">¿Qué incluye la caja?</h4>
                    {/* --- DATO DINÁMICO (MAPEADO) --- */}
                    <ul>
                        {product.caja_incluye.map((item, index) => (
                            <li key={index}>{item}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default ProductDetailPage;