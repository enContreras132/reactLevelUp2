import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

// --- Importa tus Contextos ---
import { AuthProvider } from './context/AuthContext.jsx'
import { CartProvider } from './context/CartContext.jsx'

// --- ¡AQUÍ VAN TUS ESTILOS GLOBALES! ---
import 'bootstrap/dist/css/bootstrap.min.css';

// estilos globales
import './assets/css/font-awesome.min.css';
import './assets/css/style.css';
import './assets/css/responsive.css';
// ---------------------------------------------

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <CartProvider>
        <App />
      </CartProvider>
    </AuthProvider>
  </React.StrictMode>,
)