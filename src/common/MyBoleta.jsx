import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/axiosConfig';

const Boleta = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [pedido, setPedido] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const cargarPedido = async () => {
            // Si hay ID en la URL, cargar desde el backend
            if (id) {
                try {
                    const response = await api.get(`/pedido/${id}`);
                    setPedido(response.data);
                    setLoading(false);
                } catch (err) {
                    console.error('Error al cargar pedido:', err);
                    setLoading(false);
                }
            } else {
                // Si no hay ID, obtener el último pedido desde localStorage
                const ultimaCompra = localStorage.getItem('ultimaCompra');
                if (ultimaCompra) {
                    const pedidoLocal = JSON.parse(ultimaCompra);
                    setPedido(pedidoLocal);
                }
                setLoading(false);
            }
        };
        
        cargarPedido();
    }, [id]);

    if (loading) {
        return (
            <div className="container py-5 text-center">
                <h3>Cargando boleta...</h3>
            </div>
        );
    }

    if (!pedido) {
        return (
            <div className="container py-5">
                <div className="alert alert-warning">
                    <h4>No hay información de compra disponible</h4>
                    <p>Por favor, realiza una compra primero.</p>
                    <button className="btn btn-primary" onClick={() => navigate('/productos')}>
                        Ver Productos
                    </button>
                </div>
            </div>
        );
    }

    // Calcular IVA (19% en Chile)
    const IVA_PORCENTAJE = 0.19;
    const montoSinIVA = pedido.total || pedido.monto_total || 0;
    const montoIVA = Math.round(montoSinIVA * IVA_PORCENTAJE);
    const montoTotal = montoSinIVA + montoIVA;

    return (
        <div className="container py-5">
            <div className="row justify-content-center">
                <div className="col-lg-8">
                    <div className="card shadow-lg">
                        <div className="card-header bg-primary text-white text-center py-4">
                            <h2 className="mb-0">Boleta de Compra</h2>
                            <p className="mb-0">Level Up - Tu tienda tecnológica</p>
                        </div>
                        
                        <div className="card-body p-4">
                            {/* Información del pedido */}
                            <div className="row mb-4">
                                <div className="col-md-6">
                                    <h5 className="text-primary border-bottom pb-2">Datos del Pedido</h5>
                                    <p className="mb-1"><strong>N° Pedido:</strong> {pedido.id || pedido.id_pedido || '-'}</p>
                                    <p className="mb-1"><strong>Fecha:</strong> {
                                        pedido.fecha 
                                            ? new Date(pedido.fecha).toLocaleString('es-CL')
                                            : pedido.fecha_hora
                                            ? new Date(pedido.fecha_hora).toLocaleString('es-CL')
                                            : new Date().toLocaleString('es-CL')
                                    }</p>
                                    <p className="mb-1"><strong>Estado:</strong> <span className="badge bg-success">{pedido.estado || 'Pendiente'}</span></p>
                                </div>
                                
                                <div className="col-md-6">
                                    <h5 className="text-primary border-bottom pb-2">Datos del Cliente</h5>
                                    <p className="mb-1"><strong>Nombre:</strong> {pedido.cliente || pedido.usuario?.nombre || '-'}</p>
                                    <p className="mb-1"><strong>Email:</strong> {pedido.email || pedido.usuario?.correo || '-'}</p>
                                    <p className="mb-1"><strong>Método de Pago:</strong> {pedido.metodoPago || pedido.metodo_pago || '-'}</p>
                                </div>
                            </div>

                            {/* Dirección de envío */}
                            <div className="mb-4">
                                <h5 className="text-primary border-bottom pb-2">Dirección de Envío</h5>
                                <p className="mb-1"><strong>Dirección:</strong> {pedido.direccion || '-'}</p>
                                <p className="mb-1"><strong>Comuna:</strong> {pedido.comuna?.nombre || pedido.comuna || '-'}</p>
                                <p className="mb-1"><strong>Región:</strong> {pedido.comuna?.region?.nombre || pedido.region || '-'}</p>
                            </div>

                            {/* Tabla de productos */}
                            {pedido.items && pedido.items.length > 0 && (
                                <div className="mb-4">
                                    <h5 className="text-primary border-bottom pb-2">Detalle de Productos</h5>
                                    <div className="table-responsive">
                                        <table className="table table-striped">
                                            <thead className="table-light">
                                                <tr>
                                                    <th>Producto</th>
                                                    <th className="text-center">Cantidad</th>
                                                    <th className="text-end">Precio Unit.</th>
                                                    <th className="text-end">Subtotal</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {pedido.items.map((item, index) => (
                                                    <tr key={index}>
                                                        <td>{item.nombre || item.name || '-'}</td>
                                                        <td className="text-center">{item.cantidad || item.qty || 1}</td>
                                                        <td className="text-end">${(item.precio || item.price || 0).toLocaleString('es-CL')}</td>
                                                        <td className="text-end">
                                                            ${((item.precio || item.price || 0) * (item.cantidad || item.qty || 1)).toLocaleString('es-CL')}
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            )}

                            {/* Totales */}
                            <div className="border-top pt-3">
                                <div className="row">
                                    <div className="col-md-6 offset-md-6">
                                        <div className="d-flex justify-content-between mb-2">
                                            <span>Subtotal:</span>
                                            <strong>${montoSinIVA.toLocaleString('es-CL')}</strong>
                                        </div>
                                        <div className="d-flex justify-content-between mb-2">
                                            <span>IVA (19%):</span>
                                            <strong>${montoIVA.toLocaleString('es-CL')}</strong>
                                        </div>
                                        <div className="d-flex justify-content-between border-top pt-2 mt-2">
                                            <h5 className="mb-0">Total:</h5>
                                            <h5 className="mb-0 text-primary">${montoTotal.toLocaleString('es-CL')}</h5>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="card-footer bg-light text-center py-3">
                            <button className="btn btn-primary me-2">
                                <i className="bi bi-printer me-2"> Imprimir Boleta</i>
                            </button>
                            <button 
                                className="btn btn-secondary"
                                onClick={() => navigate('/productos')}
                            >
                                Volver a Productos
                            </button>
                        </div>
                    </div>

                    <div className="text-center mt-3 text-muted">
                        <small>Gracias por tu compra en Level Up</small>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Boleta;
