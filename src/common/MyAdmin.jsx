import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Soloaudifonos from './MySoloaudifonos';
import Solomouse from './MySolomouse';
import Soloteclado from './MySoloteclado';
import Solonotebook from './MySolonotebook';
import Soloclientes from './MySoloclientes';
import Soloadmin from './MySoloadmin';

export default function Admin() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  const [view, setView] = useState('dashboard'); // 'dashboard' | 'productos' | 'pedidos' | 'usuarios'
  const [showAddForm, setShowAddForm] = useState(false);
  const [showDeleteForm, setShowDeleteForm] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [deleteCategory, setDeleteCategory] = useState('');
  const [deleteId, setDeleteId] = useState('');
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
    const categorias = ['Audífono', 'Mouse', 'Teclado', 'Notebook'];
    
    // Campos base comunes para todos los productos
    const camposBase = ['nombre', 'categoria', 'marca', 'precio', 'stock', 'descripcion', 'urlImagen'];
    
    // Campos específicos por categoría
    const camposPorCategoria = {
      'Mouse': ['inalambrico', 'color', 'botonesCant', 'dpi', 'dpiMin', 'dpiMax'],
      'Audífono': ['inalambrico', 'color', 'botonesCant'],
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
        descripcion: '',
        urlImagen: ''
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

    const handleSubmitProduct = async (e) => {
      e.preventDefault();
      
      // Validación básica
      if (!newProduct.nombre || !newProduct.precio || !newProduct.stock) {
        alert('Por favor completa los campos obligatorios: nombre, precio y stock');
        return;
      }

      // Determinar el endpoint según la categoría
      const API_BASE = 'https://levelupapi-production.up.railway.app';
      const endpoints = {
        'Audífono': `${API_BASE}/audifono`,
        'Mouse': `${API_BASE}/mouse`,
        'Teclado': `${API_BASE}/teclado`,
        'Notebook': `${API_BASE}/notebook`
      };

      const endpoint = endpoints[selectedCategory];
      
      if (!endpoint) {
        alert('Error: Categoría no válida');
        return;
      }

      try {
        // Preparar datos: convertir strings a números donde corresponda
        const productData = { ...newProduct };
        
        // Convertir campos numéricos
        const numericFields = ['precio', 'stock', 'botonesCant', 'dpi', 'dpiMin', 'dpiMax'];
        numericFields.forEach(field => {
          if (productData[field] !== undefined && productData[field] !== '') {
            productData[field] = Number(productData[field]);
          }
        });

        // Realizar POST request
        const response = await axios.post(endpoint, productData);
        
        console.log('Producto creado:', response.data);
        alert('Producto agregado correctamente');
        
        // Resetear formulario
        setShowAddForm(false);
        setSelectedCategory('');
        setNewProduct({});
        
        // Recargar la vista para mostrar el nuevo producto
        setView('dashboard');
        setTimeout(() => setView('productos'), 100);
        
      } catch (error) {
        console.error('Error al crear producto:', error);
        
        if (error.response) {
          // El servidor respondió con un código de error
          alert(`Error al guardar el producto: ${error.response.data.message || error.response.statusText}`);
        } else if (error.request) {
          // La petición fue hecha pero no hubo respuesta
          alert('Error: No se pudo conectar con el servidor. Verifica que el backend esté ejecutándose.');
        } else {
          // Algo pasó al configurar la petición
          alert(`Error: ${error.message}`);
        }
      }
    };

    const handleDeleteProduct = async (e) => {
      e.preventDefault();
      
      // Validación
      if (!deleteCategory || !deleteId) {
        alert('Por favor selecciona la categoría e ingresa el ID del producto');
        return;
      }

      // Confirmar eliminación
      if (!window.confirm(`¿Estás seguro de eliminar el producto con ID ${deleteId} de la categoría ${deleteCategory}?`)) {
        return;
      }

      // Determinar el endpoint según la categoría
      const API_BASE = 'https://levelupapi-production.up.railway.app';
      const endpoints = {
        'Audífono': `${API_BASE}/audifono`,
        'Mouse': `${API_BASE}/mouse`,
        'Teclado': `${API_BASE}/teclado`,
        'Notebook': `${API_BASE}/notebook`
      };

      const endpoint = `${endpoints[deleteCategory]}/${deleteId}`;
      
      if (!endpoints[deleteCategory]) {
        alert('Error: Categoría no válida');
        return;
      }

      try {
        await axios.delete(endpoint);
        
        alert('Producto eliminado correctamente');
        
        // Resetear formulario
        setShowDeleteForm(false);
        setDeleteCategory('');
        setDeleteId('');
        
        // Recargar la vista para actualizar la tabla
        setView('dashboard');
        setTimeout(() => setView('productos'), 100);
        
      } catch (error) {
        console.error('Error al eliminar producto:', error);
        
        if (error.response) {
          if (error.response.status === 404) {
            alert('Error: Producto no encontrado');
          } else {
            alert(`Error al eliminar el producto: ${error.response.data.message || error.response.statusText}`);
          }
        } else if (error.request) {
          alert('Error: No se pudo conectar con el servidor. Verifica que el backend esté ejecutándose.');
        } else {
          alert(`Error: ${error.message}`);
        }
      }
    };

    const renderFormField = (campo) => {
      const labels = {
        nombre: 'Nombre *',
        categoria: 'Categoría *',
        marca: 'Marca',
        precio: 'Precio *',
        stock: 'Stock *',
        urlImagen: 'URL Imagen',
        descripcion: 'Descripción',
        inalambrico: 'Inalámbrico',
        color: 'Color',
        botonesCant: 'Cantidad de botones',
        dpi: 'DPI',
        dpiMin: 'DPI Mínimo',
        dpiMax: 'DPI Máximo',
        procesador: 'Procesador',
        ram: 'RAM',
        memoria: 'Memoria',
        pantalla: 'Pantalla',
        tarjetaGrafica: 'Tarjeta Gráfica',
        dimension: 'Dimensión',
        switch: 'Switch'
      };

      const tipoInput = ['precio', 'stock', 'botonesCant', 'dpi', 'dpiMin', 'dpiMax'].includes(campo) 
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
        <div className="d-flex justify-content-between align-items-center mb-4 gap-2">
          <button 
            className="btn btn-success"
            onClick={() => {
              setShowAddForm(!showAddForm);
              if (showDeleteForm) setShowDeleteForm(false);
            }}
          >
            <i className="bi bi-plus-lg me-1"></i>
            {showAddForm ? 'Cancelar' : 'Agregar producto'}
          </button>
          <button 
            className="btn btn-danger"
            onClick={() => {
              setShowDeleteForm(!showDeleteForm);
              if (showAddForm) setShowAddForm(false);
            }}
          >
            <i className="bi bi-trash me-1"></i>
            {showDeleteForm ? 'Cancelar' : 'Eliminar producto'}
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

        {showDeleteForm && (
          <div className="card mb-4" style={{ backgroundColor: '#1a1f2e', border: '1px solid #dc3545' }}>
            <div className="card-body">
              <h5 className="card-title text-light mb-3">
                <i className="bi bi-trash me-2"></i>
                Eliminar Producto
              </h5>
              
              <form onSubmit={handleDeleteProduct}>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label text-light">Categoría *</label>
                    <select
                      className="form-select"
                      value={deleteCategory}
                      onChange={(e) => setDeleteCategory(e.target.value)}
                      required
                    >
                      <option value="">Seleccionar categoría</option>
                      {categorias.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="col-md-6">
                    <label className="form-label text-light">ID del Producto *</label>
                    <input
                      type="number"
                      className="form-control"
                      value={deleteId}
                      onChange={(e) => setDeleteId(e.target.value)}
                      placeholder="Ingresa el ID del producto"
                      required
                      min="1"
                    />
                  </div>
                </div>

                <div className="alert alert-warning mt-3 mb-0">
                  <i className="bi bi-exclamation-triangle me-2"></i>
                  <strong>Advertencia:</strong> Esta acción no se puede deshacer. El producto será eliminado permanentemente de la base de datos.
                </div>

                <div className="mt-4 d-flex gap-2">
                  <button type="submit" className="btn btn-danger">
                    <i className="bi bi-trash me-1"></i>
                    Eliminar Producto
                  </button>
                  <button 
                    type="button" 
                    className="btn btn-outline-secondary"
                    onClick={() => {
                      setShowDeleteForm(false);
                      setDeleteCategory('');
                      setDeleteId('');
                    }}
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Tablas de productos por categoría */}
        <Soloaudifonos />
        <Solomouse/>
        <Soloteclado/>
        <Solonotebook/>
      </div>
    );
  }

  // pedidos view removed — table intentionally omitted

  function renderUsuarios() {
    return (
      <div>
        <h2 className="mb-4">Gestión de Usuarios</h2>
        
        {/* Tablas de usuarios por rol */}
        <Soloadmin />
        <Soloclientes />
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

          {/* Pedidos removed from sidebar per request */}

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
          {view === 'dashboard' ? 'Dashboard' : view === 'productos' ? 'Gestión de Productos' : 'Gestión de Usuarios'}
        </h1>

        <div id="content-area" className="text-light">
          {view === 'dashboard' && renderDashboard()}
          {view === 'productos' && renderProductos()}
          {view === 'usuarios' && renderUsuarios()}
        </div>
      </main>
    </div>
  );
}