import React, { useState, useEffect } from 'react';
// 1. Importamos los "hooks" necesarios
import { useAuth } from '../context/AuthContext'; // Nuestro "cerebro" de auth
import { useNavigate, Link } from 'react-router-dom';  // Para redirigir y para los links

// 2. Importamos tu CSS personalizado
import '../assets/css/styleuser.css'; 

function LoginPage() {
    // 3. ESTADO del formulario (para controlar los inputs)
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(''); // Reemplaza a tu <div id="error-message">

    // 4. Conexión al contexto y al router
    const { login, isAuthenticated } = useAuth(); // Sacamos la función login y el estado
    const navigate = useNavigate();           // Inicializamos el hook de navegación

    // 5. EFECTO: Si el usuario YA está logueado, lo redirige al panel
    useEffect(() => {
        if (isAuthenticated) {
            navigate('/paneladmin'); // Redirige al panel
        }
    }, [isAuthenticated, navigate]);

    // 6. MANEJADOR de Submit (reemplaza tu listener de 'appuser.js')
    const handleSubmit = (e) => {
        e.preventDefault(); // Evita que la página recargue

        // Llamamos a la función "login" de nuestro "cerebro" (AuthContext)
        const success = login(email, password);

        if (success) {
            // ÉXITO: El contexto ya guardó al usuario.
            navigate('/paneladmin'); // Redirigimoss
        } else {
            // ERROR: Mostramos el mensaje en nuestro estado de error
            setError('Usuario o contraseña incorrectos.');
            // (Tu appuser.js buscaba el email, pero los datos de tu data.js
            // parecen usar 'email' como nombre de usuario, así que está bien)
        }
    };

    // 7. El JSX (Tu HTML "traducido")
    return (
        // Reemplazamos <body> por un <div> con las mismas clases
        <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
            <div className="tarjeta-login p-8 rounded-2xl shadow-2xl max-w-md w-full mx-4 text-center">
                
                <h2 className="text-4xl font-bold mb-6" style={{color: '#00ffea', textShadow: '0 0 10px #00ffea'}}>
                    Bienvenido Gamer
                </h2>

                {/* Reemplazamos <form id="login-form"> */}
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        {/* 8. Conectamos el input al estado de React */}
                        <input
                            type="text" // (Tu HTML decía "text", lo mantengo)
                            id="email"
                            className="campo-input w-full px-4 py-3 rounded-lg placeholder:text-[#00ffeaaa]"
                            placeholder="Nombre de usuario"
                            required
                            autoComplete="username"
                            value={email} // Controlado por React
                            onChange={(e) => setEmail(e.target.value)} // Actualiza el estado
                        />
                    </div>
                    <div>
                        {/* 9. Conectamos el input al estado de React */}
                        <input
                            type="password"
                            id="password"
                            className="campo-input w-full px-4 py-3 rounded-lg placeholder:text-[#00ffeaaa]"
                            placeholder="Contraseña"
                            required
                            autoComplete="current-password"
                            value={password} // Controlado por React
                            onChange={(e) => setPassword(e.target.value)} // Actualiza el estado
                        />
                    </div>
                    <button type="submit" className="boton-brillo w-full py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00ffea]">
                        Iniciar Sesión
                    </button>
                    
                    {/* 10. Reemplazamos <a href="index.html"> por <Link to="/"> */}
                    <Link to="/" className="boton-brillo block w-full py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00ffea] no-underline">
                        Pagina Principal
                    </Link>
                </form>

                {/* 11. Reemplazo de <div id="error-message"> */}
                {/* Esto solo se "dibuja" SI hay un error en el estado */}
                {error && (
                    <div id="error-message" style={{ color: '#ff5555', textAlign: 'center', marginTop: '15px' }}>
                        {error}
                    </div>
                )}

                <p className="mt-6" style={{color: '#00ffea'}}>
                    ¿Olvidaste tu contraseña? <a href="#">Recupérala aquí</a>
                </p>
                <p className="mt-6" style={{color: '#00ffea'}}>
                    {/* 12. Reemplazamos <a href="book.html"> por <Link to="/book"> */}
                    ¿O no tienes cuenta? <Link to="/book">Registrate aquí!</Link>
                </p>
            </div>
        </div>
    );
}

export default LoginPage;