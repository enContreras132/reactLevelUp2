import React from 'react';
import { Outlet } from 'react-router-dom'; 
import Sidebar from '../components/Sidebar';

function DashboardLayout() {
    return (
        <div style={{ display: 'flex' }}>
            <Sidebar /> {/* El menú siempre está visible */}
            <main style={{ flexGrow: 1, padding: '20px' }}>
                {/* Aquí es donde se "dibujará" la sub-página
                  correspondiente (DashboardHomePage, DashboardProductos, etc.) 
                */}
                <Outlet />
            </main>
        </div>
    );
}
export default DashboardLayout;