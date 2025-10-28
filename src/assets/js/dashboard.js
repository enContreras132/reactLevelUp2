

// Importamos los datos de nuestra base de datos falsa
import { productos, pedidos } from './data.js';

// ---OBTENER ELEMENTOS DEL HTML---
const sidebarMenu = document.getElementById('sidebar-menu');
const contentTitle = document.getElementById('content-title');
const contentArea = document.getElementById('content-area');
const userName = document.getElementById('user-name');
const logoutButton = document.getElementById('logout-button');

// ---VERIFICAR QUE EL USUARIO ESTÉ LOGUEADO---
const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
if (!currentUser) {
    window.location.href = 'user.html'; // Si no hay nadie, ¡fuera de aquí!
}



// Función para mostrar el Dashboard principal
const renderDashboard = () => {
    contentTitle.textContent = 'Dashboard';
    contentArea.innerHTML = `
        <div class="alert alert-info" style="background-color: #343a40; border-color: #00ffea; color: #00ffea;">
            <h4>¡Bienvenido de vuelta, ${currentUser.nombre}!</h4>
            <p>Este es tu centro de control. Selecciona una opción del menú de la izquierda para empezar a gestionar la tienda.</p>
        </div>
    `;
};

// Función para mostrar la tabla de Productos 
const renderProductos = () => {
    contentTitle.textContent = 'Gestión de Productos';
    let tableRows = productos.map(p => `
        <tr>
            <td>${p.id}</td>
            <td>${p.nombre}</td>
            <td><span class="badge ${p.stock < 10 ? 'bg-danger' : 'bg-success'}">${p.stock}</span></td>
            <td>$${p.precio.toLocaleString('es-CL')}</td>
        </tr>
    `).join('');
    contentArea.innerHTML = `
        <table class="table table-hover">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Stock</th>
                    <th>Precio</th>
                </tr>
            </thead>
            <tbody>
                ${tableRows}
            </tbody>
        </table>`;
};

// Función para mostrar la tabla de Pedidos (COMPLETA Y SIN DUPLICAR)
const renderPedidos = () => {
    contentTitle.textContent = 'Gestión de Pedidos';
    let tableRows = pedidos.map(p => `
        <tr>
            <td>#${p.id}</td>
            <td>${p.cliente}</td>
            <td><span class="badge" style="background-color: #00ffea; color: #212529;">${p.estado}</span></td>
            <td>$${p.total.toLocaleString('es-CL')}</td>
        </tr>
    `).join('');
    contentArea.innerHTML = `
        <table class="table table-hover">
            <thead>
                <tr>
                    <th>ID Pedido</th>
                    <th>Cliente</th>
                    <th>Estado</th>
                    <th>Total</th>
                </tr>
            </thead>
            <tbody>
                ${tableRows}
            </tbody>
        </table>`;
};


// --- 4. FUNCIÓN DE INICIALIZACIÓN ---
const init = () => {
    userName.textContent = currentUser.nombre;
    const { rol } = currentUser;

    let menuHTML = `<li class="nav-item"><a href="#" class="nav-link active" data-view="dashboard"><i class="bi bi-speedometer2 me-2"></i>Dashboard</a></li>`;

    if (rol === 'admin' || rol === 'inventario') {
        menuHTML += `<li><a href="#" class="nav-link text-white" data-view="productos"><i class="bi bi-box-seam me-2"></i>Productos</a></li>`;
    }
    if (rol === 'admin' || rol === 'pedidos') {
        menuHTML += `<li><a href="#" class="nav-link text-white" data-view="pedidos"><i class="bi bi-receipt me-2"></i>Pedidos</a></li>`;
    }
    sidebarMenu.innerHTML = menuHTML;

    renderDashboard();

    sidebarMenu.addEventListener('click', (e) => {
        if (e.target.tagName === 'A') {
            e.preventDefault();
            document.querySelectorAll('#sidebar-menu .nav-link').forEach(link => link.classList.remove('active'));
            e.target.classList.add('active');
            const view = e.target.dataset.view;
            if (view === 'dashboard') renderDashboard();
            if (view === 'productos') renderProductos();
            if (view === 'pedidos') renderPedidos();
        }
    });

    logoutButton.addEventListener('click', (e) => {
        e.preventDefault();
        sessionStorage.removeItem('currentUser');
        window.location.href = 'user.html';
    });
};

if (currentUser) {
    init();
}