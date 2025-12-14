import React, { useState, useEffect } from 'react';
import api from '../api/axiosConfig';

const API_URL = 'http://localhost:8080';

const Solopedidos = () => {
    const [pedidos, setPedidos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');

    const cargarPedidos = () => {
        setLoading(true);
        api.get('/pedido')
            .then(response => {
                // Normalizar datos
                const data = Array.isArray(response.data) ? response.data : [response.data];
                console.log('Pedidos procesados:', data);
                
                setPedidos(data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error al cargar los pedidos:", err);
                setError("No se pudieron cargar los datos del servidor.");
                setLoading(false);
            });
    };

    useEffect(() => {
        cargarPedidos();
    }, []);

    const handleChangeEstado = async (idPedido, nuevoEstado) => {
        try {
            // Actualizar estado en el backend
            await api.put(`/pedido/${idPedido}`, {
                estado: nuevoEstado
            });
            
            // Actualizar estado local
            setPedidos(prevPedidos => 
                prevPedidos.map(p => 
                    p.id_pedido === idPedido ? { ...p, estado: nuevoEstado } : p
                )
            );
            
            setSuccessMessage('Estado del pedido actualizado correctamente');
            setTimeout(() => setSuccessMessage(''), 3000);
            
        } catch (err) {
            console.error('Error al actualizar estado:', err);
            alert('Error al actualizar el estado del pedido: ' + (err.response?.data?.message || err.message));
        }
    };

    if (loading) return <div className="text-center py-5">Cargando pedidos...</div>;
    if (error) return <div className="alert alert-danger m-3">{error}</div>;

    return(
        <div style={{ padding: '20px', marginTop: '20px'}}>
            <h2 className="text-center mb-4">Pedidos Registrados</h2>
            
            {successMessage && (
                <div className="alert alert-success alert-dismissible fade show" role="alert">
                    <strong>{successMessage}</strong>
                    <button 
                        type="button" 
                        className="btn-close" 
                        onClick={() => setSuccessMessage('')}
                        aria-label="Close"
                    ></button>
                </div>
            )}
            
            {pedidos.length > 0 ? (
                <div className="table-responsive">
                    <table className="table table-striped table-bordered table-hover">
                        <thead className="table-dark">
                            <tr>
                                <th>ID Pedido</th>
                                <th>Cliente</th>
                                <th>Correo</th>
                                <th>Fecha y Hora</th>
                                <th>Estado</th>
                                <th>Método de Pago</th>
                                <th>Dirección</th>
                                <th>Comuna</th>
                                <th>Región</th>
                                <th>Monto Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pedidos.map((pedido, index) => {
                                console.log('Renderizando pedido:', pedido);
                                
                                // Formatear fecha
                                const fechaFormateada = pedido.fecha_hora 
                                    ? new Date(pedido.fecha_hora).toLocaleString('es-CL', {
                                        year: 'numeric',
                                        month: '2-digit',
                                        day: '2-digit',
                                        hour: '2-digit',
                                        minute: '2-digit'
                                    })
                                    : '-';
                                
                                return (
                                    <tr key={pedido.id_pedido || index}>
                                        <td>{pedido.id_pedido || '-'}</td>
                                        <td><strong>{pedido.usuario?.nombre || '-'}</strong></td>
                                        <td>{pedido.usuario?.correo || '-'}</td>
                                        <td>{fechaFormateada}</td>
                                        <td style={{ minWidth: 150 }}>
                                            <select 
                                                className="form-select form-select-sm"
                                                value={pedido.estado || 'pendiente'}
                                                onChange={(e) => handleChangeEstado(pedido.id_pedido, e.target.value)}
                                            >
                                                <option value="pendiente">Pendiente</option>
                                                <option value="aceptado">Aceptado</option>
                                                <option value="rechazado">Rechazado</option>
                                            </select>
                                        </td>
                                        <td>
                                            <span className="badge bg-info">
                                                {pedido.metodo_pago || '-'}
                                            </span>
                                        </td>
                                        <td>{pedido.direccion || '-'}</td>
                                        <td>{pedido.comuna?.nombre || '-'}</td>
                                        <td>{pedido.comuna?.region?.nombre || '-'}</td>
                                        <td className="text-end">
                                            <strong>${(pedido.monto_total || 0).toLocaleString('es-CL')}</strong>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p className="text-center text-muted">No hay pedidos registrados</p>
            )}
        </div>
    );
};

export default Solopedidos;
