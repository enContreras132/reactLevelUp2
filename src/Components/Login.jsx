import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { usuarios } from '../data/data';

export default function Login() {
  const navigate = useNavigate();
  const [identifier, setIdentifier] = useState(''); // nombre de usuario o email
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
    setError('');
    const user = usuarios.find(
      (u) =>
        (u.email?.toLowerCase() === identifier.toLowerCase() ||
          u.nombre?.toLowerCase() === identifier.toLowerCase()) &&
        u.pass === password
    );
    if (!user) {
      setError('Usuario o contraseña incorrectos.');
      return;
    }
    // Guardar session mínima y redirigir
    try {
      localStorage.setItem('user', JSON.stringify({ id: user.id, nombre: user.nombre, rol: user.rol }));
    } catch {}
    navigate('/');
  };

  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100 bg-light">
      <div className="card shadow-sm" style={{ maxWidth: 420, width: '100%' }}>
        <div className="card-body p-4 text-center">
          <h2 className="mb-3" style={{ color: '#00ffea', textShadow: '0 0 8px #00ffea' }}>Bienvenido Gamer</h2>

          <form onSubmit={onSubmit} className="mb-3">
            <div className="mb-3 text-start">
              <label htmlFor="identifier" className="form-label">Usuario o correo</label>
              <input
                id="identifier"
                type="text"
                className="form-control"
                placeholder="Nombre de usuario o email"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                required
              />
            </div>

            <div className="mb-3 text-start">
              <label htmlFor="password" className="form-label">Contraseña</label>
              <input
                id="password"
                type="password"
                className="form-control"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {error && <div className="alert alert-danger py-2">{error}</div>}

            <button type="submit" className="btn btn-primary w-100 mb-2" style={{ backgroundColor: '#00aaff', borderColor: '#00aaff' }}>
              Iniciar Sesión
            </button>

            <Link to="/" className="btn btn-outline-secondary w-100">
              Página Principal
            </Link>
          </form>

          <p className="mb-1 text-muted" style={{ color: '#00ffea' }}>
            ¿Olvidaste tu contraseña? <a href="#" className="text-decoration-underline" style={{ color: '#00ffea' }}>Recupérala aquí</a>
          </p>
          <p className="mb-0" style={{ color: '#00ffea' }}>
            ¿No tienes cuenta? <Link to="/book" className="text-decoration-underline" style={{ color: '#00ffea' }}>Regístrate aquí</Link>
          </p>
        </div>
      </div>
    </div>
  );
}