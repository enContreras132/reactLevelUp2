import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useFormValidation } from '../utils/useFormValidation.js';

function Registro() {
    const [regiones, setRegiones] = useState([]);
    const [loadingRegiones, setLoadingRegiones] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        // Cargar regiones desde la API
        axios.get('https://levelupapi-production.up.railway.app/region')
            .then(response => {
                const data = Array.isArray(response.data) ? response.data : [response.data];
                setRegiones(data);
                setLoadingRegiones(false);
            })
            .catch(err => {
                console.error('Error al cargar regiones:', err);
                setLoadingRegiones(false);
            });
    }, []);
    const {
        formData,
        errors,
        touched,
        handleChange,
        handleBlur,
        validateAllFields,
        getFieldClass,
        resetForm
    } = useFormValidation({
        nombre: '',
        telefono: '',
        mail: '',
        rut: '',
        nacimiento: '',
        direccion: '',
        password: '',
        confirmPassword: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        if (validateAllFields()) {
            const user = {
                id: `cli-${Date.now()}`,
                nombre: formData.nombre,
                email: formData.mail,
                rol: 'cliente',
            };
            try {
                sessionStorage.setItem('currentUser', JSON.stringify(user));
            } catch {}
            // Opcional: redirige de vuelta al checkout
            navigate('/checkout', { replace: true });
            resetForm(); // Si quieres limpiar el form
        }
    };

    return (
        <>
            {/* book section */}
            <section className="book_section layout_padding">
                <div className="container position-relative">

                    <div className="heading_container text_center">
                        <h2 style={{color: 'white'}}>
                            Registrate para ordenar
                        </h2>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="form_container">
                                <form id="formulario" onSubmit={handleSubmit}>
                                    <div className={getFieldClass('nombre')}>
                                        <label htmlFor="nombre" style={{color: 'white'}}>Nombre</label>
                                        <input 
                                            id="nombre" 
                                            name="nombre"
                                            type="text" 
                                            className="form-control" 
                                            value={formData.nombre}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                        {touched.nombre && errors.nombre && (
                                        <div className="alert alert-danger py-2 mt-2" style={{display: 'block'}}>{errors.nombre}</div>)}                                       </div>
                                    <div className={getFieldClass('telefono')}>
                                        <label htmlFor="telefono" style={{color: 'white'}}>Numero de telefono</label>
                                        <input 
                                            id="telefono" 
                                            name="telefono"
                                            type="tel" 
                                            className="form-control" 
                                            placeholder="+56912345678"
                                            value={formData.telefono}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                        {touched.telefono && errors.telefono && (
                                        <div className="alert alert-danger py-2 mt-2" style={{display: 'block'}}>{errors.telefono}</div>)}                                       </div>
                                    <div className={getFieldClass('mail')}>
                                        <label htmlFor="mail" style={{color: 'white'}}>Email</label>
                                        <input 
                                            id="mail" 
                                            name="mail"
                                            type="email" 
                                            className="form-control" 
                                            value={formData.mail}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                        {touched.mail && errors.mail && (
                                        <div className="alert alert-danger py-2 mt-2" style={{display: 'block'}}>{errors.mail}</div>)}                                       </div>
                                    <div className={getFieldClass('rut')}>
                                        <label htmlFor="rut" style={{color: 'white'}}>Rut (12345678-9)</label>
                                        <input 
                                            id="rut" 
                                            name="rut"
                                            type="text" 
                                            className="form-control" 
                                            placeholder="12345678-9"
                                            value={formData.rut}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                        {touched.rut && errors.rut && (
                                        <div className="alert alert-danger py-2 mt-2" style={{display: 'block'}}>{errors.rut}</div>)}                                       </div>
                                    <div className={getFieldClass('nacimiento')}>
                                        <label htmlFor="nacimiento" style={{color: 'white'}}>Fecha de nacimiento</label>
                                        <input 
                                            id="nacimiento" 
                                            name="nacimiento"
                                            type="date" 
                                            className="form-control" 
                                            value={formData.nacimiento}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                        {touched.direccion && errors.direccion && (
                                        <div className="alert alert-danger py-2 mt-2" style={{display: 'block'}}>{errors.direccion}</div>)}                                       </div>
                                    <div className={getFieldClass('direccion')}>
                                        <label htmlFor="direccion" style={{color: 'white'}}>Región</label>
                                        {loadingRegiones ? (
                                            <select className="form-control" disabled>
                                                <option>Cargando regiones...</option>
                                            </select>
                                        ) : (
                                            <select
                                                id="direccion" 
                                                name="direccion"
                                                className="form-control"
                                                value={formData.direccion}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            >
                                                <option value="">Selecciona una región</option>
                                                {regiones.map((region) => (
                                                    <option key={region.id} value={region.nombre}>
                                                        {region.nombre}
                                                    </option>
                                                ))}
                                            </select>
                                        )}
                                        {touched.direccion && errors.direccion && (
                                        <div className="alert alert-danger py-2 mt-2" style={{display: 'block'}}>{errors.direccion}</div>)}                                    </div>
                                    <div className={getFieldClass('password')}>
                                        <label htmlFor="password" style={{color: 'white'}}>Contraseña</label>
                                        <input 
                                            id="password" 
                                            name="password"
                                            type="password" 
                                            className="form-control" 
                                            placeholder="Mínimo 6 caracteres"
                                            value={formData.password}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                        {touched.password && errors.password && (
                                        <div className="alert alert-danger py-2 mt-2" style={{display: 'block'}}>{errors.password}</div>)}
                                    </div>
                                    <div className={getFieldClass('confirmPassword')}>
                                        <label htmlFor="confirmPassword" style={{color: 'white'}}>Confirmar Contraseña</label>
                                        <input 
                                            id="confirmPassword" 
                                            name="confirmPassword"
                                            type="password" 
                                            className="form-control" 
                                            placeholder="Repite tu contraseña"
                                            value={formData.confirmPassword}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                        {touched.confirmPassword && errors.confirmPassword && (
                                        <div className="alert alert-danger py-2 mt-2" style={{display: 'block'}}>{errors.confirmPassword}</div>)}
                                    </div>
                                        <div className="btn_box">
                                        <button type="submit">
                                            Registrarme
                                        </button>
                                    </div>
                                    
                                </form>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* end book section */}
        </>
    );
}
export default Registro;