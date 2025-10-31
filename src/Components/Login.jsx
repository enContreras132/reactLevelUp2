import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { usuarios } from '../data/data';
import { useFormValidation } from '../utils/useFormValidation.js';

// Componente de Login para autenticación de usuarios
export default function Login() {
  const navigate = useNavigate();
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
    identifier: '',
    password: ''
  });
  const [error, setError] = React.useState('');

  // Maneja el envío del formulario de login
  const onSubmit = (e) => {
    e.preventDefault();
    setError('');
    // Validación de campos vacíos
    if (!validateAllFields()) {
      return;
    }
    // Busca el usuario por email o nombre y contraseña
    const user = usuarios.find(
      (u) =>
        (u.email?.toLowerCase() === formData.identifier.toLowerCase() ||
          u.nombre?.toLowerCase() === formData.identifier.toLowerCase()) &&
        u.pass === formData.password
    );
    if (!user) {
      setError('Usuario o contraseña incorrectos.');
      return;
    }
    // Guardar en localStorage y sessionStorage para compatibilidad y persistencia
    const payload = { id: user.id, nombre: user.nombre, rol: user.rol };
    try {
      localStorage.setItem('user', JSON.stringify(payload));
      sessionStorage.setItem('currentUser', JSON.stringify(payload));
    } catch (err) {
      console.error('storage error', err);
    }
    // Redirigir según rol
    if (user.rol === 'admin') {
      navigate('/admin', { replace: true });
    } else {
      navigate('/', { replace: true });
    }
  };

  return (
    <div className="login-page">
      <div className="card login-card">
        <div className="card-body p-4">
          <h2 className="mb-3 text-center login-title">Bienvenido Gamer</h2>

          <form onSubmit={onSubmit} className="mb-3">
            <div className={getFieldClass('identifier') + ' mb-3 text-start'}>
              <label htmlFor="identifier" className="form-label custom">Usuario o correo</label>
              <input
                id="identifier"
                name="identifier"
                type="text"
                className="form-control login-input"
                placeholder="Nombre de usuario o email"
                value={formData.identifier}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {touched.identifier && errors.identifier && (
                <p style={{ color: 'white', backgroundColor: 'black' }}>{errors.identifier}</p>
              )}
            </div>

            <div className={getFieldClass('password') + ' mb-3 text-start'}>
              <label htmlFor="password" className="form-label custom">Contraseña</label>
              <input
                id="password"
                name="password"
                type="password"
                className="form-control login-input"
                placeholder="Contraseña"
                value={formData.password}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {touched.password && errors.password && (
                <p style={{ color: 'white', backgroundColor: 'black' }}>{errors.password}</p>
              )}
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