import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as data from '../data/data';

// compatibilidad con distintos nombres de export en data.js
const productos = data.productosData ?? data.productos ?? [];
const pedidos = data.pedidos ?? [];
const usuarios = data.usuarios ?? [];

export default function Admin() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  const [view, setView] = useState('dashboard'); // 'dashboard' | 'productos' | 'pedidos' | 'usuarios'
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [newProduct, setNewProduct] = useState({});

  useEffect(() => {
    // Intentar leer sessionStorage primero, si no existe intentar localStorage
    const sessionRaw = sessionStorage.getItem('currentUser');
    const localRaw = localStorage.getItem('user');

    if (sessionRaw) {
      try {
        setCurrentUser(JSON.parse(sessionRaw));
        return;
      } catch {
        sessionStorage.removeItem('currentUser');
      }
    }

    if (localRaw) {
      // Repoblar sessionStorage desde localStorage para mantener la sesión entre navegaciones
      try {
        sessionStorage.setItem('currentUser', localRaw);
        setCurrentUser(JSON.parse(localRaw));
        return;
      } catch {
        // si falla, limpiar datos corruptos
        sessionStorage.removeItem('currentUser');
        localStorage.removeItem('user');
      }
    }

    // Si no hay usuario en ninguna storage, redirigir a login
    navigate('/login', { replace: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleLogout(e) {
    if (e && e.preventDefault) e.preventDefault();
    // Limpiar ambas fuentes de sesión para evitar inconsistencias
    sessionStorage.removeItem('currentUser');
    localStorage.removeItem('user');
    // Redirigir a la página principal
    navigate('/', { replace: true });
  }

  function renderDashboard() {
    return (
      <div>
        <div className="alert" style={{ backgroundColor: '#343a40', borderColor: '#00ffea', color: '#00ffea' }}>
          <h4>¡Bienvenido de vuelta, {currentUser?.nombre}!</h4>
          <p>Este es tu centro de control. Selecciona una opción del menú de la izquierda para empezar a gestionar la tienda.</p>
        </div>
      </div>
    );
  }

  function renderProductos() {
    // Obtener categorías únicas
    const categorias = [...new Set(productos.map(p => p.categoria).filter(Boolean))];
    
    // Campos base comunes para todos los productos
    const camposBase = ['nombre', 'categoria', 'marca', 'precio', 'stock', 'imagen', 'descripcion'];
    
    // Campos específicos por categoría (basados en los productos existentes)
    const camposPorCategoria = {
      'Mouse': ['inalambrico', 'color', 'botonesCanti', 'dpi', 'dpiMin', 'dpiMax'],
      'Audífonos': ['inalambrico', 'color', 'tipo', 'frecuenciaRespuesta', 'botonesCanti'],
      'Notebook': ['procesador', 'ram', 'memoria', 'pantalla', 'tarjetaGrafica'],
      'Teclado': ['inalambrico', 'color', 'dimension', 'switch']
    };

    const handleCategoryChange = (cat) => {
      setSelectedCategory(cat);
      // Inicializar campos base
      const initProduct = {
        nombre: '',
        categoria: cat,
        marca: '',
        precio: '',
        stock: '',
        imagen: '',
        descripcion: ''
      };
      
      // Agregar campos específicos de la categoría
      if (camposPorCategoria[cat]) {
        camposPorCategoria[cat].forEach(campo => {
          initProduct[campo] = '';
        });
      }
      
      setNewProduct(initProduct);
    };

    const handleInputChange = (campo, valor) => {
      setNewProduct(prev => ({ ...prev, [campo]: valor }));
    };

    const handleSubmitProduct = (e) => {
      e.preventDefault();
      
      // Validación básica
      if (!newProduct.nombre || !newProduct.precio || !newProduct.stock) {
        alert('Por favor completa los campos obligatorios: nombre, precio y stock');
        return;
      }

      // Generar nuevo ID
      const maxId = Math.max(...productos.map(p => p.id), 0);
      const productoFinal = {
        ...newProduct,
        id: maxId + 1,
        precio: Number(newProduct.precio),
        stock: Number(newProduct.stock)
      };

      console.log('Nuevo producto:', productoFinal);
      alert('Producto agregado correctamente (en consola). Integrar con backend o localStorage.');
      
      // Resetear formulario
      setShowAddForm(false);
      setSelectedCategory('');
      setNewProduct({});
    };

    const renderFormField = (campo) => {
      const labels = {
        nombre: 'Nombre *',
        categoria: 'Categoría *',
        marca: 'Marca',
        precio: 'Precio *',
        stock: 'Stock *',
        imagen: 'URL Imagen',
        descripcion: 'Descripción',
        inalambrico: 'Inalámbrico',
        color: 'Color',
        botonesCanti: 'Cantidad de botones',
        dpi: 'DPI',
        dpiMin: 'DPI Mínimo',
        dpiMax: 'DPI Máximo',
        tipo: 'Tipo',
        frecuenciaRespuesta: 'Frecuencia de respuesta',
        procesador: 'Procesador',
        ram: 'RAM',
        memoria: 'Memoria',
        pantalla: 'Pantalla',
        tarjetaGrafica: 'Tarjeta Gráfica',
        dimension: 'Dimensión',
        switch: 'Switch'
      };

      const tipoInput = ['precio', 'stock', 'botonesCanti', 'dpi', 'dpiMin', 'dpiMax'].includes(campo) 
        ? 'number' 
        : 'text';

      if (campo === 'categoria') {
        return null; // Ya se seleccionó antes
      }

      if (campo === 'descripcion') {
        return (
          <div key={campo} className="col-12">
            <label className="form-label text-light">{labels[campo]}</label>
            <textarea
              className="form-control"
              rows={3}
              value={newProduct[campo] || ''}
              onChange={(e) => handleInputChange(campo, e.target.value)}
            />
          </div>
        );
      }

      if (campo === 'inalambrico') {
        return (
          <div key={campo} className="col-md-6">
            <label className="form-label text-light">{labels[campo]}</label>
            <select
              className="form-select"
              value={newProduct[campo] || ''}
              onChange={(e) => handleInputChange(campo, e.target.value)}
            >
              <option value="">Seleccionar</option>
              <option value="Sí">Sí</option>
              <option value="No">No</option>
            </select>
          </div>
        );
      }

      return (
        <div key={campo} className="col-md-6">
          <label className="form-label text-light">{labels[campo]}</label>
          <input
            type={tipoInput}
            className="form-control"
            value={newProduct[campo] || ''}
            onChange={(e) => handleInputChange(campo, e.target.value)}
          />
        </div>
      );
    };

    return (
      <div>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2 className="mb-0">Productos</h2>
          <button 
            className="btn btn-success"
            onClick={() => setShowAddForm(!showAddForm)}
          >
            <i className="bi bi-plus-lg me-1"></i>
            {showAddForm ? 'Cancelar' : 'Agregar producto'}
          </button>
        </div>

        {showAddForm && (
          <div className="card mb-4" style={{ backgroundColor: '#1a1f2e', border: '1px solid #00ffea' }}>
            <div className="card-body">
              <h5 className="card-title text-light mb-3">Nuevo Producto</h5>
              
              {!selectedCategory ? (
                <div>
                  <label className="form-label text-light">Selecciona una categoría:</label>
                  <div className="d-flex flex-wrap gap-2">
                    {categorias.map(cat => (
                      <button
                        key={cat}
                        className="btn btn-outline-info"
                        onClick={() => handleCategoryChange(cat)}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmitProduct}>
                  <div className="alert alert-info mb-3">
                    <strong>Categoría seleccionada:</strong> {selectedCategory}
                    <button 
                      type="button"
                      className="btn btn-sm btn-outline-secondary ms-3"
                      onClick={() => {
                        setSelectedCategory('');
                        setNewProduct({});
                      }}
                    >
                      Cambiar categoría
                    </button>
                  </div>

                  <div className="row g-3">
                    {/* Campos base */}
                    {camposBase.map(campo => renderFormField(campo))}
                    
                    {/* Campos específicos de la categoría */}
                    {camposPorCategoria[selectedCategory]?.map(campo => renderFormField(campo))}
                  </div>

                  <div className="mt-4 d-flex gap-2">
                    <button type="submit" className="btn btn-primary">
                      <i className="bi bi-save me-1"></i>
                      Guardar Producto
                    </button>
                    <button 
                      type="button" 
                      className="btn btn-outline-secondary"
                      onClick={() => {
                        setShowAddForm(false);
                        setSelectedCategory('');
                        setNewProduct({});
                      }}
                    >
                      Cancelar
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}

        <div className="table-responsive">
          <table className="table table-hover table-dark">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Stock</th>
                <th>Precio</th>
              </tr>
            </thead>
            <tbody>
              {productos.map((p) => (
                <tr key={p.id}>
                  <td>{p.id}</td>
                  <td>{p.nombre}</td>
                  <td>
                    <span className={`badge ${p.stock < 10 ? 'bg-danger' : 'bg-success'}`}>
                      {p.stock ?? '—'}
                    </span>
                  </td>
                  <td>${(p.precio ?? 0).toLocaleString('es-CL')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  function renderPedidos() {
    return (
      <div>
        <h2 className="mb-3">Pedidos</h2>
        <div className="table-responsive">
          <table className="table table-hover table-dark">
            <thead>
              <tr>
                <th>ID Pedido</th>
                <th>Cliente</th>
                <th>Estado</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {pedidos.map((p) => (
                <tr key={p.id}>
                  <td>#{p.id}</td>
                  <td>{p.cliente}</td>
                  <td>
                    <span className="badge" style={{ backgroundColor: '#00ffea', color: '#212529' }}>
                      {p.estado}
                    </span>
                  </td>
                  <td>${(p.total ?? 0).toLocaleString('es-CL')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  function renderUsuarios() {
    return (
      <div>
        <h2 className="mb-3">Usuarios</h2>
        <div className="table-responsive">
          <table className="table table-hover table-dark">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Email</th>
                <th>Rol</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.map((u) => (
                <tr key={u.id}>
                  <td>{u.id}</td>
                  <td>{u.nombre}</td>
                  <td>{u.email}</td>
                  <td>
                    <span className={`badge ${
                      u.rol === 'admin' ? 'bg-danger' : 
                      u.rol === 'pedidos' ? 'bg-warning' : 
                      'bg-info'
                    }`}>
                      {u.rol}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  if (!currentUser) return null; // evita render previo a la comprobación

  const { rol } = currentUser;

  return (
    <div className="d-flex">
      <nav id="sidebar" className="d-flex flex-column flex-shrink-0 p-3" style={{ minWidth: 250, background: '#0b1220', color: '#fff', height: '100vh' }}>
        <a href="#/" className="d-flex align-items-center mb-3 text-white text-decoration-none">
          <span className="fs-4">Level Up <span className="badge" style={{ backgroundColor: '#00ffea', color: '#212529' }}>Admin</span></span>
        </a>
        <hr style={{ borderColor: 'rgba(255,255,255,0.06)' }} />
        <ul id="sidebar-menu" className="nav nav-pills flex-column mb-auto">
          <li className="nav-item">
            <a href="#dashboard" className={`nav-link ${view === 'dashboard' ? 'active' : 'text-white'}`} onClick={(e) => { e.preventDefault(); setView('dashboard'); }}>
              <i className="bi bi-speedometer2 me-2"></i> Dashboard
            </a>
          </li>

          {(rol === 'admin' || rol === 'inventario') && (
            <li>
              <a href="#productos" className={`nav-link ${view === 'productos' ? 'active' : 'text-white'}`} onClick={(e) => { e.preventDefault(); setView('productos'); }}>
                <i className="bi bi-box-seam me-2"></i> Productos
              </a>
            </li>
          )}

          {(rol === 'admin' || rol === 'pedidos') && (
            <li>
              <a href="#pedidos" className={`nav-link ${view === 'pedidos' ? 'active' : 'text-white'}`} onClick={(e) => { e.preventDefault(); setView('pedidos'); }}>
                <i className="bi bi-receipt me-2"></i> Pedidos
              </a>
            </li>
          )}

          {rol === 'admin' && (
            <li>
              <a href="#usuarios" className={`nav-link ${view === 'usuarios' ? 'active' : 'text-white'}`} onClick={(e) => { e.preventDefault(); setView('usuarios'); }}>
                <i className="bi bi-people me-2"></i> Usuarios
              </a>
            </li>
          )}
        </ul>

        <hr style={{ borderColor: 'rgba(255,255,255,0.06)' }} />

        <div className="dropdown">
          <a href="#user" className="d-flex align-items-center text-white text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" onClick={(e) => e.preventDefault()}>
            <i className="bi bi-person-circle fs-4 me-2"></i>
            <strong id="user-name">{currentUser.nombre}</strong>
          </a>
          <ul className="dropdown-menu dropdown-menu-dark text-small shadow">
            <li><a className="dropdown-item" href="/" onClick={(e) => { e.preventDefault(); window.open('/', '_blank'); }}>Ver Sitio Principal</a></li>
            <li><hr className="dropdown-divider" /></li>
            <li><a className="dropdown-item" href="#logout" onClick={handleLogout}>Cerrar Sesión</a></li>
          </ul>
        </div>
      </nav>

      <main id="main-content" className="flex-grow-1 p-4" style={{ minHeight: '100vh', background: '#071021' }}>
        <h1 id="content-title" className="text-light mb-3">
          {view === 'dashboard' ? 'Dashboard' : 
           view === 'productos' ? 'Gestión de Productos' : 
           view === 'pedidos' ? 'Gestión de Pedidos' : 
           'Gestión de Usuarios'}
        </h1>

        <div id="content-area" className="text-light">
          {view === 'dashboard' && renderDashboard()}
          {view === 'productos' && renderProductos()}
          {view === 'pedidos' && renderPedidos()}
          {view === 'usuarios' && renderUsuarios()}
        </div>
      </main>
    </div>
  );
}