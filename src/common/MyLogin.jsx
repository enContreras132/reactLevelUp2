import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useFormValidation } from '../utils/useFormValidation.js';
import api from '../api/axiosConfig.js'; 

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
      // El backend espera 'username' y 'password' (busca por correo en la BD)
      const loginResponse = await api.post('/usuario/login', {
          username: formData.identifier, 
          password: formData.password
      });

      // El backend devuelve: { token, rol, nombre, id }
      const userData = loginResponse.data;
      console.log("Login exitoso, datos:", userData);

      // Validar que se recibió el token
      if (!userData || !userData.token) {
        setError('Error al obtener token de autenticación');
        return;
      }

      // Guardar el token y los datos del usuario
     
      const rawToken = userData.token;
      const cleanToken = typeof rawToken === 'string'
        ? rawToken.replace(/^\s+|\s+$/g, '').replace(/^"|"$/g, '').replace(/\r|\n/g, '')
        : String(rawToken);
      localStorage.setItem('token', cleanToken);
      
      const userPayload = {
        id: userData.id,
        nombre: userData.nombre,
        rol: userData.rol,
        // El backend solo devuelve estos campos básicos
        // Si necesitas más datos, debes hacer otra petición o ampliar el backend
      };
      
      localStorage.setItem('user', JSON.stringify(userPayload));
      sessionStorage.setItem('currentUser', JSON.stringify(userPayload));

      // Redirigir según el rol del usuario
      if (userData.rol === 'admin' || userData.rol === 'inventario') {
        navigate('/admin', { replace: true });
      } else {
        // Si es cliente, redirigir a la página principal
        navigate('/', { replace: true });
      }

    } catch (err) {
      console.error("Error de login:", err);
      
      // Manejar diferentes tipos de errores
      if (err.response) {
        if (err.response.status === 401 || err.response.status === 404) {
          setError('Usuario o contraseña incorrectos');
        } else {
          setError(`Error del servidor: ${err.response.data.message || err.response.statusText}`);
        }
      } else if (err.request) {
        setError('No se pudo conectar con el servidor. Verifica que el backend esté ejecutándose.');
      } else {
        setError('Error al procesar la solicitud');
      }
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