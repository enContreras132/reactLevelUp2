import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Para los links a cada producto
import { useCart } from '../context/CartContext'; // Para el botón "Añadir"
import productosData from '../data/productos.js'; // Tu base de datos local

function ProductPage() {
    
    // 1. REEMPLAZO DE ISOTOPE: Creamos un "estado" para el filtro
    const [filtro, setFiltro] = useState('*'); // '*' significa "Todo"

    // 2. Conectamos con el "cerebro" del carrito
    const { addItem } = useCart();

    // 3. Lógica de filtrado: creamos un NUEVO array basado en el filtro
    const productosFiltrados = (filtro === '*')
        ? productosData // Si el filtro es "*", muestra todos
        : productosData.filter(p => p.categoria === filtro); // Si no, filtra por categoría

    
    
    return (
        
        // El <header> no va aquí, lo pone App.jsx
        
        
        <section className="food_section layout_padding-bottom">
            <div className="container">
                <div className="heading_container heading_center">
                    <h2>Productos Disponibles</h2>
                </div>


                {/* Los 'li' ahora cambian el "estado" con onClick */}
                <ul className="filters_menu">
                    <li className={filtro === '*' ? 'active' : ''} onClick={() => setFiltro('*')}>Todo</li>
                    <li className={filtro === 'audifono' ? 'active' : ''} onClick={() => setFiltro('audifono')}>Audifonos</li>
                    <li className={filtro === 'mouse' ? 'active' : ''} onClick={() => setFiltro('mouse')}>Mouse</li>
                    <li className={filtro === 'teclado' ? 'active' : ''} onClick={() => setFiltro('teclado')}>Teclado</li>
                    <li className={filtro === 'notebook' ? 'active' : ''} onClick={() => setFiltro('notebook')}>Computadores</li>
                </ul>

                
                <div className="filters-content">
                    <div className="row grid">

                        {/* Mapeamos el array de "productosFiltrados" */}
                        {productosFiltrados.map((producto) => (
                            <div key={producto.id} className="col-sm-6 col-lg-4 all">
                                {/* Usamos el mismo HTML 'box' que tenías */}
                                <div className="box">
                                    <div>
                                        {/* 8. Reemplazamos <a href="..."> por <Link to="..."> */}
                                        <Link to={`/producto/${producto.id}`}>
                                            <div className="img-box">
                                                <img src={producto.imagen} alt={producto.nombre} />
                                            </div>
                                        </Link>
                                        <div className="detail-box">
                                            {/* 9. Usamos datos dinámicos */}
                                            <h5>
                                                <Link to={`/producto/${producto.id}`}>
                                                    {producto.nombre}
                                                </Link>
                                            </h5>
                                            <p>
                                                {/* Mostramos solo una parte de la descripción */}
                                                {producto.descripcion.substring(0, 70)}...
                                            </p>
                                            <div className="options">
                                                <h6>${producto.precio.toLocaleString('es-CL')}</h6>
                                                
                                                {/* 10. Botón "Añadir" funcional */}
                                                <button 
                                                    className="btn btn-warning btn-sm"
                                                    onClick={() => addItem(producto)}
                                                >
                                                    Añadir
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default ProductPage;