import React, { createContext, useState, useEffect, useContext } from 'react';
// 1. Importamos nuestros usuarios
import { usuarios } from '../data/data.js';
// 2. Creamos el Contexto
export const AuthContext = createContext();

// 3. Creamos el Proveedor
export const AuthProvider = ({ children }) => {
    
    // 4. El ESTADO: Guardamos el usuario actual.
    // Leemos sessionStorage AL INICIO, una sola vez.
    const [currentUser, setCurrentUser] = useState(() => {
        const storedUser = sessionStorage.getItem('currentUser');
        return storedUser ? JSON.parse(storedUser) : null;
    });

    // 5. El EFECTO: "Escucha" los cambios en [currentUser]
    useEffect(() => {
        if (currentUser) {
            // Si hay usuario, lo guardamos en sessionStorage
            sessionStorage.setItem('currentUser', JSON.stringify(currentUser));
        } else {
            // Si no hay usuario (logout), limpiamos sessionStorage
            sessionStorage.removeItem('currentUser');
        }
    }, [currentUser]);

    // 6. La Función de LOGIN (reemplaza tu listener)
    const login = (email, password) => {
        // Buscamos al usuario en nuestro array importado
        const user = usuarios.find(u => u.email === email && u.pass === password);

        if (user) {
            // ÉXITO: Actualizamos el estado
            setCurrentUser(user);
            return true; // Devolvemos 'true' para que el formulario sepa
        } else {
            // ERROR:
            setCurrentUser(null);
            return false; // Devolvemos 'false'
        }
    };

    // 7. La Función de LOGOUT
    const logout = () => {
        setCurrentUser(null);
    };

    // 8. Proveemos el estado y las funciones
    const value = {
        currentUser, // El objeto del usuario (o null)
        login,         // La función para iniciar sesión
        logout,        // La función para cerrar sesión
        isAuthenticated: !!currentUser // Un boolean (true/false) para saber si está logueado
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// 9. El Hook personalizado para usarlo fácil
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth debe ser usado dentro de un AuthProvider');
    }
    return context;
};