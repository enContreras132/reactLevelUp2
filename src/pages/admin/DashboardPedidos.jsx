import React from 'react';
import { pedidos } from '../../data/data.js'; // Importamos los datos

function DashboardPedidos() {
    return (
        <div>
            <h1 id="content-title">Gestión de Pedidos</h1>
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th>ID Pedido</th>
                        <th>Cliente</th>
                        <th>Estado</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    {pedidos.map(p => (
                        <tr key={p.id}>
                            <td>#{p.id}</td>
                            <td>{p.cliente}</td>
                            <td>
                                <span className="badge" style={{ backgroundColor: '#00ffea', color: '#212529' }}>
                                    {p.estado}
                                </span>
                            </td>
                            <td>${p.total.toLocaleString('es-CL')}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
export default DashboardPedidos;