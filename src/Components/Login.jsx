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
    try {
      localStorage.setItem('user', JSON.stringify({ id: user.id, nombre: user.nombre, rol: user.rol }));
    } catch {}
    navigate('/');
  };

  return (
    <div className="login-page">
      <div className="card login-card">
        <div className="card-body p-4">
          <h2 className="mb-3 text-center login-title">Bienvenido Gamer</h2>

          <form onSubmit={onSubmit} className="mb-3">
            <div className="mb-3 text-start">
              <label htmlFor="identifier" className="form-label custom">Usuario o correo</label>
              <input
                id="identifier"
                type="text"
                className="form-control login-input"
                placeholder="Nombre de usuario o email"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                required
              />
            </div>

            <div className="mb-3 text-start">
              <label htmlFor="password" className="form-label custom">Contraseña</label>
              <input
                id="password"
                type="password"
                className="form-control login-input"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {error && <div className="alert alert-danger py-2">{error}</div>}

            <button type="submit" className="btn btn-primary w-100 mb-2 btn-primary-custom">
              Iniciar Sesión
            </button>

            <Link to="/" className="btn w-100 btn-outline-light-custom">
              Página Principal
            </Link>
          </form>

          <div className="d-flex justify-content-between small" style={{ color: '#cfeff6' }}>
            <div>
              ¿Olvidaste tu contraseña? <a href="#" className="text-decoration-underline link-accent">Recupérala</a>
            </div>
            <div>
              ¿No tienes cuenta? <Link to="/registro" className="text-decoration-underline link-accent">Regístrate</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}