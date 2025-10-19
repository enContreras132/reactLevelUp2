import React from 'react';
import { Outlet } from 'react-router-dom'; 
import Sidebar from '../components/Sidebar'; 


import '../assets/css/admin.css'; 

function DashboardLayout() {
    
    // 2. Este es tu HTML, pero como componente
    return (
        // Tu <body> y <div class="d-flex"> se convierten en esto:
        <div className="d-flex admin-layout"> 
            
            {/* 3. Aquí va tu <nav id="sidebar"> */}
            <Sidebar /> 

            {/* 4. Este es tu <main id="main-content"> */}
            <main id="main-content">
                
                {/* 5. Reemplazo de <h1 id="content-title"> y <div id="content-area">
                    Aquí es donde React Router dibujará las sub-páginas
                    (DashboardHomePage, DashboardProductos, etc.)
                */}
                <Outlet />
            </main>
        </div>
    );
}

export default DashboardLayout;