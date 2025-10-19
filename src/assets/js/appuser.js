

// importamos los datos de nuestra base de datos falsa
import { usuarios } from './data.js';

// obtenemos los elementos del formulario segun su ID
const loginForm = document.getElementById('login-form');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const errorMessage = document.getElementById('error-message');

// Si un usuario ya logueado llega aquí, lo mandamos directo al panel de una xd
if (sessionStorage.getItem('currentUser')) {
    window.location.href = 'paneladmin.html';
}

//  Creamos el escuchador para el formulario
loginForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Evitamos que la página se recargue

    // Leemos los valores que el usuario escribió
    const emailValue = emailInput.value.trim();
    const passwordValue = passwordInput.value.trim();

    // Buscamos si existe un usuario que coincida
    const user = usuarios.find(u => u.email === emailValue && u.pass === passwordValue);

    if (user) {
        // ÉXITO: El usuario y la contraseña son correctos
        errorMessage.textContent = ''; // Limpiamos cualquier error
        
        // Guardamos los datos del usuario en la sesión
        sessionStorage.setItem('currentUser', JSON.stringify(user));
        
        // Lo redirigimos al panel
        window.location.href = 'paneladmin.html';
    } else {
        // ERROR: No hubo coincidencia
        errorMessage.textContent = 'Usuario o contraseña incorrectos.';
    }
});