import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:8080';

const Soloadmin = () => {
    const [usuarios, setUsuarios] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get(`${API_URL}/admin`)
            .then(response => {
                // Normalizar datos
                const data = Array.isArray(response.data) ? response.data : [response.data];
                console.log('Administradores procesados:', data);
                
                setUsuarios(data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error al cargar los administradores:", err);
                setError("No se pudieron cargar los datos del servidor.");
                setLoading(false);
            });
    }, []);

    if (loading) return <div className="text-center py-5">Cargando administradores...</div>;
    if (error) return <div className="alert alert-danger m-3">{error}</div>;

    return(
        <div style={{ padding: '20px', marginTop: '20px'}}>
            <h2 className="text-center mb-4">Lista de Administradores</h2>
            
            {usuarios.length > 0 ? (
                <div className="table-responsive">
                    <table className="table table-striped table-bordered table-hover">
                        <thead className="table-dark">
                            <tr>
                                <th>ID</th>
                                <th>Nombre</th>
                                <th>Correo</th>
                                <th>Rol</th>
                            </tr>
                        </thead>
                        <tbody>
                            {usuarios.map((usuario, index) => {
                                console.log('Renderizando usuario:', usuario);
                                return (
                                <tr key={usuario.id || index}>
                                    <td>{usuario.id}</td>
                                    <td>{usuario.nombre}</td>
                                    <td>{usuario.correo}</td>  {/* ✅ CAMBIADO de email a correo */}
                                    <td>
                                        <span className="badge bg-danger">
                                            {usuario.rol || 'admin'}
                                        </span>
                                    </td>
                                </tr>
                            )})}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p className="text-center text-muted">No hay administradores registrados</p>
            )}
        </div>
    )
}
export default Soloadmin;