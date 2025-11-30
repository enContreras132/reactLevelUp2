import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useFormValidation } from '../utils/useFormValidation.js';
import api from '../api/axiosConfig'; 

export default function Login() {
  const navigate = useNavigate();
  const {
    formData,
    errors,
    touched,
    handleChange,
    handleBlur,
    validateAllFields,
    getFieldClass
  } = useFormValidation({
    identifier: '',
    password: ''
  });
  const [error, setError] = React.useState('');

  // Maneja el envío del formulario de login
  const onSubmit = async (e) => { 
    e.preventDefault();
    setError('');

    // Validación de campos vacíos
    if (!validateAllFields()) {
      return;
    }

    try {
      
      
      
      // Mapeamos 'identifier' a 'username' porque así lo pide el backend Java
      const response = await api.post('/login', {
          username: formData.identifier, 
          password: formData.password
      });

      // 4. Si Java dice OK, guardamos el token
      const token = response.data.token;
      console.log("Login exitoso, token:", token);

      // 5. Guardamos el token REAL
      localStorage.setItem('token', token);

      // (OPCIONAL) Simulamos los datos del usuario para mantener tu lógica de roles
      // Ya que por ahora el backend solo devuelve el token.
      const userPayload = { 
        nombre: formData.identifier, 
        rol: 'admin' 
      };
      
      localStorage.setItem('user', JSON.stringify(userPayload));

      // 6. Redirigimos
      // Como sabemos que el usuario de Java es admin, lo mandamos al admin panel
      navigate('/admin', { replace: true });

    } catch (err) {
      console.error("Error de login:", err);
      // Si falla, mostramos mensaje de error
      setError('Usuario o contraseña incorrectos (Verifica tu API).');
    }
  };

  return (
    <div className="login-page">
      <div className="card login-card">
        <div className="card-body p-4">
          <h2 className="mb-3 text-center login-title">Bienvenido Gamer</h2>

          <form onSubmit={onSubmit} className="mb-3">
            <div className={getFieldClass('identifier') + ' mb-3 text-start'}>
              <label htmlFor="identifier" className="form-label custom">Usuario</label>
              <input
                id="identifier"
                name="identifier"
                type="text"
                className="form-control login-input"
                placeholder="Ej: admin"
                value={formData.identifier}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {touched.identifier && errors.identifier && (
                <div className="alert alert-danger py-2 mt-2">{errors.identifier}</div>
              )}
            </div>

            <div className={getFieldClass('password') + ' mb-3 text-start'}>
              <label htmlFor="password" className="form-label custom">Contraseña</label>
              <input
                id="password"
                name="password"
                type="password"
                className="form-control login-input"
                placeholder="Ej: 1234"
                value={formData.password}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {touched.password && errors.password && (
                <div className="alert alert-danger py-2 mt-2">{errors.password}</div>
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