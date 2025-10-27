import React from 'react';
import ReactDOM from 'react-dom/client';

// 1. Importa el Router aquí, y solo aquí.
import { BrowserRouter } from 'react-router-dom';

// 2. Importa tus "cerebros" y tu componente App
// (Asegúrate de que App.jsx esté en la misma carpeta src)
import App, { AuthProvider, CartProvider } from './App.jsx';

<<<<<<< Updated upstream


// --- Importa tus Contextos ---
import { AuthProvider } from './context/AuthContext.jsx'
import { CartProvider } from './context/CartContext.jsx'

import { BrowserRouter } from 'react-router-dom'
// ---------------------------------------------
=======

import 'bootstrap/dist/css/bootstrap.min.css';

>>>>>>> Stashed changes


// 4. Esta es la única vez que llamamos a ReactDOM.createRoot
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* 5. Envolvemos TODO dentro del Router y los "cerebros" */}
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
