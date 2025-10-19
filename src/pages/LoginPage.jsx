import React, { useState, useEffect } from 'react';
// 1. Importamos los "hooks" necesarios
import { useAuth } from '../context/AuthContext'; // Nuestro "cerebro" de auth
import { useNavigate } from 'react-router-dom';  // Para redirigir

function LoginPage() {
    // 2. ESTADO del formulario
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(''); // Reemplaza a errorMessage

    // 3. Conexión al contexto y al router
    const { login, isAuthenticated } = useAuth(); // Sacamos la función login y el estado
    const navigate = useNavigate();           // Inicializamos el hook de navegación

    // 4. EFECTO: Reemplaza tu chequeo de sesión al inicio.
    // Si el usuario YA está logueado (isAuthenticated es true), lo redirige.
    useEffect(() => {
        if (isAuthenticated) {
            navigate('/paneladmin'); // Redirige al panel
        }
    }, [isAuthenticated, navigate]); // Se ejecuta si 'isAuthenticated' cambia

    // 5. MANEJADOR de Submit (reemplaza tu listener)
    const handleSubmit = (e) => {
        e.preventDefault(); // Sigue siendo igual

        // Llamamos a la función "login" de nuestro cerebro (AuthContext)
        const success = login(email, password);

        if (success) {
            // ÉXITO: El contexto ya guardó al usuario.
            // Simplemente lo redirigimos.
            navigate('/paneladmin');
        } else {
            // ERROR: Mostramos el mensaje en nuestro estado de error
            setError('Usuario o contraseña incorrectos.');
        }
    };

    // 6. El JSX (El Formulario)
    return (
        <div className="login-container">
            <form id="login-form" onSubmit={handleSubmit}>
                <h2>Iniciar Sesión</h2>
                
                {/* Mostramos el error si existe */}
                {error && <p id="error-message" style={{ color: 'red' }}>{error}</p>}
                
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Contraseña</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Ingresar</button>
            </form>
        </div>
    );
}

export default LoginPage;