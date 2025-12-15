import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import axios from 'axios';
import api from '../api/axiosConfig';

export default function Checkout() {
	const navigate = useNavigate();
	const { items, total, count, clear } = useCart();
	const [processing, setProcessing] = useState(false);
	const [success, setSuccess] = useState(false);

	const [regiones, setRegiones] = useState([]);
	const [comunas, setComunas] = useState([]);
	const [comunasFiltradas, setComunasFiltradas] = useState([]);
	const [loadingRegiones, setLoadingRegiones] = useState(true);
	const [selectedRegion, setSelectedRegion] = useState('');

	const [form, setForm] = useState({
		nombre: '',
		email: '',
		direccion: '',
		region: '',
		comuna: '',
		metodoPago: 'tarjeta',
	});
	const [errors, setErrors] = useState({});

	const resumen = useMemo(() => ({ items, total, count }), [items, total, count]);

	// Cargar regiones y comunas desde la API
	useEffect(() => {
		const cargarDatos = async () => {
			try {
				const [regionesRes, comunasRes] = await Promise.all([
				api.get('/region').catch(() => ({ data: [] })),
				api.get('/comuna').catch(() => ({ data: [] }))
			]);
				const comunasData = Array.isArray(comunasRes.data) ? comunasRes.data : [];
				
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

	// Redirigir a login si intenta comprar sin sesión iniciada
	useEffect(() => {
		// Solo forzar login si hay items por pagar y aún no mostramos éxito
		if (!items || items.length === 0 || success) return;
		let logged = false;
		try {
			const s = sessionStorage.getItem('currentUser');
			const l = localStorage.getItem('user');
			if (s) logged = true;
			else if (l) logged = true;
		} catch {}
		if (!logged) {
			navigate('/login');
		}
	}, [items, success, navigate]);

	// Manejar cambio de región y filtrar comunas
	const handleRegionChange = (e) => {
		const regionId = e.target.value;
		setSelectedRegion(regionId);
		setForm({ ...form, region: regionId, comuna: '' });
		
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
	};

	function validate() {
		const e = {};
		if (!form.nombre.trim()) e.nombre = 'Ingresa tu nombre';
		if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Correo inválido';
		if (!form.direccion.trim()) e.direccion = 'Ingresa tu dirección';
		if (!form.region) e.region = 'Selecciona una región';
		if (!form.comuna || isNaN(parseInt(form.comuna))) e.comuna = 'Selecciona una comuna';
		return e;
	}

	const onSubmit = async (e) => {
		e.preventDefault();
		const e2 = validate();
		setErrors(e2);
		if (Object.keys(e2).length) return;
		setProcessing(true);

		try {
			// Obtener usuario actual desde localStorage/sessionStorage
			let currentUser = null;
			try {
				const sessionData = sessionStorage.getItem('currentUser');
				const localData = localStorage.getItem('user');
				currentUser = JSON.parse(sessionData || localData);
			} catch (err) {
				console.error('Error al obtener usuario:', err);
			}

			if (!currentUser || !currentUser.id) {
				throw new Error('No se encontró usuario autenticado. Por favor inicia sesión nuevamente.');
			}

			// Preparar datos para el backend según PedidoModel
			const pedidoData = {
				usuario: {
					id: currentUser.id
				},
				metodo_pago: form.metodoPago,
				direccion: form.direccion,
				comuna: {
					id: parseInt(form.comuna)
				},
				monto_total: Math.round(resumen.total),
				estado: 'pendiente'
			};

			console.log('Enviando pedido:', pedidoData);

			// Hacer POST request al backend
			const response = await api.post('/pedido', pedidoData);
			
			console.log('Pedido creado exitosamente:', response.data);

			// Guardar último pedido para referencia local
			try {
				const pedidoLocal = {
					id: response.data.id_pedido || Date.now(),
					cliente: form.nombre,
					email: form.email,
					direccion: form.direccion,
					metodoPago: form.metodoPago,
					total: resumen.total,
					items: resumen.items,
					fecha: new Date().toISOString(),
				};
				localStorage.setItem('ultimaCompra', JSON.stringify(pedidoLocal));
			} catch (storageErr) {
				console.error('Error al guardar en localStorage:', storageErr);
			}

			// Limpiar carrito y mostrar éxito
			clear();
			setSuccess(true);
			
		} catch (error) {
			console.error('Error al procesar pedido:', error);
			
			let errorMessage = 'Error al procesar el pedido. ';
			
			if (error.message && error.message.includes('usuario autenticado')) {
				errorMessage = error.message;
				// Redirigir al login
				alert(errorMessage);
				navigate('/login');
				return;
			} else if (error.response) {
				// El servidor respondió con un código de error
				const serverMsg = error.response.data.message || error.response.statusText;
				errorMessage += serverMsg;
			} else if (error.request) {
				// La petición fue hecha pero no hubo respuesta
				errorMessage += 'No se pudo conectar con el servidor. Verifica que el backend esté ejecutándose.';
			} else {
				// Algo pasó al configurar la petición
				errorMessage += error.message;
			}
			
			alert(errorMessage);
		} finally {
			setProcessing(false);
		}
	};

	if (!items || items.length === 0) {
		// Si viene sin items y no es por éxito, mostrar volver a productos
		return (
			<section className="py-5 footer_section">
				<div className="container py">
					{success ? (
						<div className="alert alert-success">
							<h4 className="text-black">¡Gracias por tu compra!</h4>
							<p className='text-black'>Tu pedido ha sido procesado correctamente.</p>
							<div className="d-flex justify-content-center">
								<Link to="/productos" className="btn btn-primary me-2">Seguir comprando</Link>
								<Link to="/" className="btn btn-outline-secondary">Ir al inicio</Link>
							</div>
						</div>
					) : (
						<div className="alert alert-info text-dark">
							<p className="mb-3">No tienes productos en el carrito.</p>
							<Link to="/productos" className="btn btn-primary">Ver productos</Link>
						</div>
					)}
				</div>
			</section>
		);
	}

	return (
		<section className="py-5 footer_section">
			<div className="container">
				<div className="row g-4">
					<div className="col-12 col-lg-7">
						<div className="card">
							<div className="card-body">
								<h5 className="card-title">Datos del comprador</h5>
								<form onSubmit={onSubmit}>
									<div className="mb-3">
										<label className="form-label">Nombre</label>
										<input
											className={`form-control ${errors.nombre ? 'is-invalid' : ''}`}
											value={form.nombre}
											onChange={(e) => setForm({ ...form, nombre: e.target.value })}
										/>
										{errors.nombre && <div className="invalid-feedback">{errors.nombre}</div>}
									</div>
									<div className="mb-3">
										<label className="form-label">Email</label>
										<input
											type="email"
											className={`form-control ${errors.email ? 'is-invalid' : ''}`}
											value={form.email}
											onChange={(e) => setForm({ ...form, email: e.target.value })}
										/>
										{errors.email && <div className="invalid-feedback">{errors.email}</div>}
									</div>
									<div className="mb-3">
										<label className="form-label">Dirección</label>
										<input
											className={`form-control ${errors.direccion ? 'is-invalid' : ''}`}
											value={form.direccion}
											onChange={(e) => setForm({ ...form, direccion: e.target.value })}
											placeholder="Calle, número, depto, etc."
										/>
										{errors.direccion && <div className="invalid-feedback">{errors.direccion}</div>}
									</div>
									<div className="row">
										<div className="col-md-6 mb-3">
											<label className="form-label">Región</label>
											{loadingRegiones ? (
												<select className="form-select" disabled>
													<option>Cargando regiones...</option>
												</select>
											) : (
												<select
													className={`form-select ${errors.region ? 'is-invalid' : ''}`}
													value={form.region}
													onChange={handleRegionChange}
												>
													<option value="">Selecciona una región</option>
													{regiones.map((region) => (
														<option key={region.id} value={region.id}>
															{region.nombre}
														</option>
													))}
												</select>
											)}
											{errors.region && <div className="invalid-feedback">{errors.region}</div>}
										</div>
										<div className="col-md-6 mb-3">
											<label className="form-label">Comuna</label>
											<select
												className={`form-select ${errors.comuna ? 'is-invalid' : ''}`}
												value={form.comuna}
												onChange={(e) => setForm({ ...form, comuna: e.target.value })}
												disabled={!selectedRegion || loadingRegiones}
											>
												<option value="">
													{!selectedRegion ? 'Primero selecciona una región' : 'Selecciona una comuna'}
												</option>
												{comunasFiltradas.map((comuna) => (
												<option key={comuna.id} value={comuna.id}>
														{comuna.nombre}
													</option>
												))}
											</select>
											{errors.comuna && <div className="invalid-feedback">{errors.comuna}</div>}
										</div>
									</div>
									<div className="mb-3">
										<label className="form-label">Método de pago</label>
										<select
											className="form-select"
											value={form.metodoPago}
											onChange={(e) => setForm({ ...form, metodoPago: e.target.value })}
										>
											<option value="tarjeta">Tarjeta de crédito/débito</option>
											<option value="transferencia">Transferencia</option>
											<option value="efectivo">Efectivo (contra entrega)</option>
										</select>
									</div>
									<div className="d-flex gap-2">
										<button type="submit" className="btn btn-success" disabled={processing}>
											{processing ? 'Procesando...' : 'Confirmar compra'}
										</button>
										<button type="button" className="btn btn-outline-secondary" onClick={() => navigate('/cart')}>
											Volver al carrito
										</button>
									</div>
								</form>
							</div>
						</div>
					</div>

					<aside className="col-12 col-lg-5">
						<div className="card">
							<div className="card-body">
								<h5 className="card-title">Resumen de compra</h5>
								<ul className="list-group mb-3">
									{resumen.items.map((it) => (
										<li key={it.id} className="list-group-item d-flex justify-content-between align-items-center">
											<div>
												<div className="fw-semibold">{it.nombre}</div>
												<small className="text-muted">x{it.cantidad || it.qty || 1}</small>
											</div>
											<span>${(((it.cantidad || it.qty || 1) * (it.precio || 0))).toLocaleString('es-CL')}</span>
										</li>
									))}
								</ul>
								<div className="d-flex justify-content-between">
									<strong>Total</strong>
									<strong>${resumen.total.toLocaleString('es-CL')}</strong>
								</div>
							</div>
						</div>
					</aside>
				</div>
			</div>
		</section>
	);
}
