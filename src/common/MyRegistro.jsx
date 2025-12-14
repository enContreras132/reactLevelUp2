import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useFormValidation } from '../utils/useFormValidation.js';

function Registro() {
    const [regiones, setRegiones] = useState([]);
    const [comunas, setComunas] = useState([]);
    const [comunasFiltradas, setComunasFiltradas] = useState([]);
    const [loadingRegiones, setLoadingRegiones] = useState(true);
    const [selectedRegion, setSelectedRegion] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        // Cargar regiones y comunas desde la API
        const cargarDatos = async () => {
            try {
                const [regionesRes, comunasRes] = await Promise.all([
                    axios.get('/api/region').catch(() => ({ data: [] })),
                    axios.get('/api/comuna').catch(() => ({ data: [] }))
                ]);
                
                const regionesData = Array.isArray(regionesRes.data) ? regionesRes.data : [];
                const comunasData = Array.isArray(comunasRes.data) ? comunasRes.data : [];
                
                console.log('Regiones cargadas:', regionesData);
                console.log('Comunas cargadas:', comunasData);
                
                setRegiones(regionesData);
                setComunas(comunasData);
            } catch (err) {
                console.error('Error al cargar regiones/comunas:', err);
                setRegiones([]);
                setComunas([]);
            } finally {
                setLoadingRegiones(false);
            }
        };
        
        cargarDatos();
    }, []);
    const {
        formData,
        errors,
        touched,
        handleChange,
        handleBlur,
        validateAllFields,
        getFieldClass,
        resetForm,
        setFieldValue
    } = useFormValidation({
        nombre: '',
        telefono: '',
        mail: '',
        rut: '',
        nacimiento: '',
        region: '',
        direccion: '',
        password: '',
        confirmPassword: ''
    });

    // Manejar cambio de región y filtrar comunas
    const handleRegionChange = (e) => {
        const regionId = e.target.value;
        setSelectedRegion(regionId);
        handleChange(e);
        
        // Filtrar comunas de la región seleccionada
        if (regionId) {
            const filtered = comunas.filter(comuna => 
                String(comuna.regionId) === String(regionId) || 
                String(comuna.region?.id) === String(regionId)
            );
            setComunasFiltradas(filtered);
        } else {
            setComunasFiltradas([]);
        }
        
        // Resetear comuna al cambiar región
        if (setFieldValue) {
            setFieldValue('direccion', '');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (validateAllFields()) {
            try {
                // Buscar el ID de la comuna seleccionada
                const comunaSeleccionada = comunasFiltradas.find(
                    comuna => comuna.nombre === formData.direccion
                );
                
                if (!comunaSeleccionada) {
                    alert('Error: Comuna no válida. Por favor selecciona una comuna nuevamente.');
                    return;
                }

                // Preparar datos para el backend según ClienteModel
                const clienteData = {
                    nombre: formData.nombre,
                    rut: formData.rut,
                    telefono: formData.telefono,
                    correo: formData.mail,
                    fechaNacimiento: formData.nacimiento,
                    contraseña: formData.password,
                    rol: 'cliente',
                    comuna: {
                        id: comunaSeleccionada.id
                    }
                };

                console.log('Enviando datos:', clienteData);

                // Hacer POST request al backend
                const response = await axios.post('/api/cliente', clienteData);
                
                console.log('Cliente registrado exitosamente:', response.data);
                
                // Mostrar mensaje de éxito
                alert('¡Cuenta creada exitosamente! Ahora puedes iniciar sesión.');
                
                // Limpiar formulario
                resetForm();
                
                // Redirigir al login
                navigate('/login', { replace: true });
                
            } catch (error) {
                console.error('Error al registrar cliente:', error);
                
                if (error.response) {
                    // El servidor respondió con un código de error
                    const errorMsg = error.response.data.message || error.response.statusText;
                    alert(`Error al crear la cuenta: ${errorMsg}`);
                } else if (error.request) {
                    // La petición fue hecha pero no hubo respuesta
                    alert('Error: No se pudo conectar con el servidor. Verifica que el backend esté ejecutándose.');
                } else {
                    // Algo pasó al configurar la petición
                    alert(`Error: ${error.message}`);
                }
            }
        } else {
            alert('Por favor completa todos los campos correctamente antes de continuar.');
        }
    };

    return (
        <section className="py-5" style={{ minHeight: '100vh'}}>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-12 col-md-10 col-lg-8">
                        <div className="card shadow-lg border-0">
                            <div className="card-header bg-primary text-white text-center py-4">
                                <h2 className="mb-0">
                                    <i className="fa fa-user-plus me-2"></i>
                                    Crear Cuenta
                                </h2>
                                <p className="mb-0 mt-2">Completa el formulario para registrarte</p>
                            </div>
                            <div className="card-body p-4 p-md-5">
                                <form id="formulario" onSubmit={handleSubmit}>
                                    <div className="row g-3">
                                        <div className="col-md-6">
                                            <label htmlFor="nombre" className="form-label fw-bold">
                                                Nombre Completo <span className="text-danger">*</span>
                                            </label>
                                            <input 
                                                id="nombre" 
                                                name="nombre"
                                                type="text" 
                                                className={`form-control ${touched.nombre ? (errors.nombre ? 'is-invalid' : 'is-valid') : ''}`}
                                                placeholder="Ingresa tu nombre completo"
                                                value={formData.nombre}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />
                                            {touched.nombre && errors.nombre && (
                                                <div className="invalid-feedback">{errors.nombre}</div>
                                            )}
                                        </div>

                                        <div className="col-md-6">
                                            <label htmlFor="telefono" className="form-label fw-bold">
                                                Teléfono <span className="text-danger">*</span>
                                            </label>
                                            <input 
                                                id="telefono" 
                                                name="telefono"
                                                type="tel" 
                                                className={`form-control ${touched.telefono ? (errors.telefono ? 'is-invalid' : 'is-valid') : ''}`}
                                                placeholder="+56912345678"
                                                value={formData.telefono}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />
                                            {touched.telefono && errors.telefono && (
                                                <div className="invalid-feedback">{errors.telefono}</div>
                                            )}
                                        </div>

                                        <div className="col-12">
                                            <label htmlFor="mail" className="form-label fw-bold">
                                                Email <span className="text-danger">*</span>
                                            </label>
                                            <div className="input-group">
                                                <span className="input-group-text"><i className="fa fa-envelope"></i></span>
                                                <input 
                                                    id="mail" 
                                                    name="mail"
                                                    type="email" 
                                                    className={`form-control ${touched.mail ? (errors.mail ? 'is-invalid' : 'is-valid') : ''}`}
                                                    placeholder="correo@ejemplo.com"
                                                    value={formData.mail}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                />
                                                {touched.mail && errors.mail && (
                                                    <div className="invalid-feedback">{errors.mail}</div>
                                                )}
                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <label htmlFor="rut" className="form-label fw-bold">
                                                RUT <span className="text-danger">*</span>
                                            </label>
                                            <input 
                                                id="rut" 
                                                name="rut"
                                                type="text" 
                                                className={`form-control ${touched.rut ? (errors.rut ? 'is-invalid' : 'is-valid') : ''}`}
                                                placeholder="12345678-9"
                                                value={formData.rut}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />
                                            {touched.rut && errors.rut && (
                                                <div className="invalid-feedback">{errors.rut}</div>
                                            )}
                                        </div>

                                        <div className="col-md-6">
                                            <label htmlFor="nacimiento" className="form-label fw-bold">
                                                Fecha de Nacimiento <span className="text-danger">*</span>
                                            </label>
                                            <input 
                                                id="nacimiento" 
                                                name="nacimiento"
                                                type="date" 
                                                className={`form-control ${touched.nacimiento ? (errors.nacimiento ? 'is-invalid' : 'is-valid') : ''}`}
                                                value={formData.nacimiento}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />
                                            {touched.nacimiento && errors.nacimiento && (
                                                <div className="invalid-feedback">{errors.nacimiento}</div>
                                            )}
                                        </div>

                                        <div className="col-md-6">
                                            <label htmlFor="region" className="form-label fw-bold">
                                                Región <span className="text-danger">*</span>
                                            </label>
                                            {loadingRegiones ? (
                                                <select className="form-select" disabled>
                                                    <option>Cargando regiones...</option>
                                                </select>
                                            ) : (
                                                <select
                                                    id="region" 
                                                    name="region"
                                                    className={`form-select ${touched.region ? (errors.region ? 'is-invalid' : 'is-valid') : ''}`}
                                                    value={formData.region}
                                                    onChange={handleRegionChange}
                                                    onBlur={handleBlur}
                                                >
                                                    <option value="">Selecciona una región</option>
                                                    {regiones.map((region) => (
                                                        <option key={region.id} value={region.id}>
                                                            {region.nombre}
                                                        </option>
                                                    ))}
                                                </select>
                                            )}
                                            {touched.region && errors.region && (
                                                <div className="invalid-feedback">{errors.region}</div>
                                            )}
                                        </div>

                                        <div className="col-md-6">
                                            <label htmlFor="direccion" className="form-label fw-bold">
                                                Comuna <span className="text-danger">*</span>
                                            </label>
                                            <select
                                                id="direccion" 
                                                name="direccion"
                                                className={`form-select ${touched.direccion ? (errors.direccion ? 'is-invalid' : 'is-valid') : ''}`}
                                                value={formData.direccion}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                disabled={!selectedRegion || loadingRegiones}
                                            >
                                                <option value="">
                                                    {!selectedRegion ? 'Primero selecciona una región' : 'Selecciona una comuna'}
                                                </option>
                                                {comunasFiltradas.map((comuna) => (
                                                    <option key={comuna.id} value={comuna.nombre}>
                                                        {comuna.nombre}
                                                    </option>
                                                ))}
                                            </select>
                                            {touched.direccion && errors.direccion && (
                                                <div className="invalid-feedback">{errors.direccion}</div>
                                            )}
                                        </div>

                                        <div className="col-md-6">
                                            <label htmlFor="password" className="form-label fw-bold">
                                                Contraseña <span className="text-danger">*</span>
                                            </label>
                                            <div className="input-group">
                                                <span className="input-group-text"><i className="fa fa-lock"></i></span>
                                                <input 
                                                    id="password" 
                                                    name="password"
                                                    type="password" 
                                                    className={`form-control ${touched.password ? (errors.password ? 'is-invalid' : 'is-valid') : ''}`}
                                                    placeholder="Mínimo 6 caracteres"
                                                    value={formData.password}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                />
                                                {touched.password && errors.password && (
                                                    <div className="invalid-feedback">{errors.password}</div>
                                                )}
                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <label htmlFor="confirmPassword" className="form-label fw-bold">
                                                Confirmar Contraseña <span className="text-danger">*</span>
                                            </label>
                                            <div className="input-group">
                                                <span className="input-group-text"><i className="fa fa-lock"></i></span>
                                                <input 
                                                    id="confirmPassword" 
                                                    name="confirmPassword"
                                                    type="password" 
                                                    className={`form-control ${touched.confirmPassword ? (errors.confirmPassword ? 'is-invalid' : 'is-valid') : ''}`}
                                                    placeholder="Repite tu contraseña"
                                                    value={formData.confirmPassword}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                />
                                                {touched.confirmPassword && errors.confirmPassword && (
                                                    <div className="invalid-feedback">{errors.confirmPassword}</div>
                                                )}
                                            </div>
                                        </div>

                                        <div className="col-12 mt-4">
                                            <div className="d-grid gap-2">
                                                <button type="submit" className="btn btn-primary btn-lg">
                                                    <i className="fa fa-check me-2"></i>
                                                    Crear Mi Cuenta
                                                </button>
                                            </div>
                                        </div>

                                        <div className="col-12 text-center mt-3">
                                            <small className="text-muted">
                                                ¿Ya tienes cuenta? <a href="/login" className="text-primary fw-bold">Inicia sesión aquí</a>
                                            </small>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
export default Registro;