import React from 'react';
import productosData from '../data/productos.js';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom'; // 1. Importa el componente <Link>

function ProductList() {
    const { addItem } = useCart();

    return (
        <section className="product_section layout_padding">
            <div className="container">
                <div className="heading_container heading_center">
                    <h2>Nuestros Productos</h2>
                </div>
                
                <div className="row">
                    {productosData.map((producto) => (
                        <div key={producto.id} className="col-sm-6 col-lg-4 all">
                            <div className="box">
                                
                                {/* 2. Envuelve la imagen con un <Link> */}
                                <Link to={`/producto/${producto.id}`}>
                                    <div className="img-box">
                                        <img src={producto.imagen} alt={producto.nombre} />
                                    </div>
                                </Link>

                                <div className="detail-box">
                                    {/* 3. Envuelve el nombre con un <Link> */}
                                    <h5>
                                        <Link to={`/producto/${producto.id}`}>
                                            {producto.nombre}
                                        </Link>
                                    </h5>
                                    <h6>${producto.precio.toLocaleString('es-CL')}</h6>
                                    
                                    <button 
                                        className="btn btn-primary btn-sm"
                                        onClick={() => addItem(producto)} 
                                    >
                                        Añadir al Carrito
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default ProductList;