import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:8080/mouse';
const Solomouse = () => {
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get(API_URL)
            .then(response => {
                
                // Normalizar datos
                const data = Array.isArray(response.data) ? response.data : [response.data];
                console.log('Productos procesados:', data);
                
                setProductos(data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error al cargar los productos:", err);
                setError("No se pudieron cargar los datos del servidor.");
                setLoading(false);
            });
    }, []);

    if (loading) return <div className="text-center py-5">Cargando productos...</div>;
    if (error) return <div className="alert alert-danger m-3">{error}</div>;

    return(
        <div style={{ padding: '20px', marginTop: '20px'}}>
            <h2 className="text-center mb-4">Catálogo actual de Mouse</h2>
            
            {productos.length > 0 ? (
                <div className="table-responsive">
                    <table className="table table-striped table-bordered table-hover">
                        <thead className="table-dark">
                            <tr>
                                <th>ID</th>
                                <th>Nombre</th>
                                <th>Categoría</th>
                                <th>Marca</th>
                                <th>Precio</th>
                                <th>Stock</th>
                                <th>Inalámbrico</th>
                                <th>Color</th>
                                <th>Cantidad de Botones</th>
                                <th>DPI</th>
                                <th>DPI Mínimo</th>
                                <th>DPI Máximo</th>
                                <th>Descripción</th>
                                <th>Imagen</th>
                            </tr>
                        </thead>
                        <tbody>
                            {productos.map((producto, index) => {
                                console.log('Renderizando producto:', producto);
                                return (
                                <tr key={producto.id || index}>
                                    <td>{producto.id}</td>
                                    <td><strong>{producto.nombre}</strong></td>
                                    <td>{producto.categoria}</td>
                                    <td>{producto.marca}</td>
                                    <td className="text-end">
                                        ${(producto.precio || 0).toLocaleString()}
                                    </td>
                                    <td className="text-center">{producto.stock}</td>
                                    <td className="text-center">{producto.inalambrico}</td>
                                    <td>{producto.color}</td>
                                    <td className="text-center">
                                        {producto.botonesCant || producto.cantidadDeBotones || 'N/A'}
                                    </td>
                                    <td className="text-center">{producto.dpi || 'N/A'}</td>
                                    <td className="text-center">{producto.dpiMin || 'N/A'}</td>
                                    <td className="text-center">{producto.dpiMax || 'N/A'}</td>
                                    <td>{producto.descripcion || 'N/A'}</td>
                                    <td>
                                        {producto.urlImagen && producto.urlImagen.startsWith('http') ? (
                                            <img 
                                                src={producto.urlImagen} 
                                                alt={producto.nombre || 'Producto'}
                                                style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                                                onError={(e) => {
                                                    e.target.onerror = null;
                                                    e.target.src = 'https://via.placeholder.com/50?text=Sin+Imagen';
                                                }}
                                            />
                                        ) : (
                                            <span className="text-muted">Sin imagen</span>
                                        )}
                                    </td>
                                </tr>
                            )})}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p className="text-center text-muted">No hay mouse disponibles</p>
            )}
        </div>
    )
}
export default Solomouse;
