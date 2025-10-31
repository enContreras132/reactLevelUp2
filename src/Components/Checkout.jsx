import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function Checkout() {
	const navigate = useNavigate();
	const { items, total, count, clear } = useCart();
	const [processing, setProcessing] = useState(false);
	const [success, setSuccess] = useState(false);

	const [form, setForm] = useState({
		nombre: '',
		email: '',
		direccion: '',
		metodoPago: 'tarjeta',
	});
	const [errors, setErrors] = useState({});

	const resumen = useMemo(() => ({ items, total, count }), [items, total, count]);

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

	function validate() {
		const e = {};
		if (!form.nombre.trim()) e.nombre = 'Ingresa tu nombre';
		if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Correo inválido';
		if (!form.direccion.trim()) e.direccion = 'Ingresa tu dirección';
		return e;
	}

	function onSubmit(e) {
		e.preventDefault();
		const e2 = validate();
		setErrors(e2);
		if (Object.keys(e2).length) return;
		setProcessing(true);

		// Simular procesamiento de pago
		setTimeout(() => {
			try {
				const pedido = {
					id: Date.now(),
					cliente: form.nombre,
					email: form.email,
					direccion: form.direccion,
					metodoPago: form.metodoPago,
					total: resumen.total,
					items: resumen.items,
					fecha: new Date().toISOString(),
				};
				// Guardar último pedido para consulta (admin/usuario)
				localStorage.setItem('ultimaCompra', JSON.stringify(pedido));
			} catch {}

			clear();
			setProcessing(false);
			setSuccess(true);
		}, 1000);
	}

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
										/>
										{errors.direccion && <div className="invalid-feedback">{errors.direccion}</div>}
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
												<small className="text-muted">x{it.qty || 1}</small>
											</div>
											<span>${(((it.qty || 1) * (it.precio || 0))).toLocaleString('es-CL')}</span>
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
