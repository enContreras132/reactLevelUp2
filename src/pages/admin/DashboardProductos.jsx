import React from 'react';
import { productos } from '../../data/data.js'; // Importamos los datos

function DashboardProductos() {
    return (
        <div>
            <h1 id="content-title">Gestión de Productos</h1>
            {/* Ya no usamos innerHTML, "dibujamos" la tabla con JSX y .map() */}
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Stock</th>
                        <th>Precio</th>
                    </tr>
                </thead>
                <tbody>
                    {productos.map(p => (
                        <tr key={p.id}>
                            <td>{p.id}</td>
                            <td>{p.nombre}</td>
                            <td>
                                <span className={`badge ${p.stock < 10 ? 'bg-danger' : 'bg-success'}`}>
                                    {p.stock}
                                </span>
                            </td>
                            <td>${p.precio.toLocaleString('es-CL')}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
export default DashboardProductos;