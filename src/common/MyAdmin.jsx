import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axiosConfig';
import axios from 'axios';
import AdminChart from './AdminChart';
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
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  
  // Estados para gestión de usuarios
  const [showAddUserForm, setShowAddUserForm] = useState(false);
  const [showDeleteUserForm, setShowDeleteUserForm] = useState(false);
  const [newUser, setNewUser] = useState({});
  const [deleteUserId, setDeleteUserId] = useState('');

  // Pedidos y productos para dashboard
  const [pedidosList, setPedidosList] = useState([]);
  const [productosForChart, setProductosForChart] = useState([]);

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

  // cargar pedidos desde localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem('pedidos');
      if (raw) setPedidosList(JSON.parse(raw));
    } catch (e) {
      console.error('Error leyendo pedidos desde localStorage', e);
    }
  }, []);

  const savePedidos = (list) => {
    try {
      setPedidosList(list);
      localStorage.setItem('pedidos', JSON.stringify(list));
    } catch (e) {
      console.error('Error guardando pedidos', e);
    }
  };

  const updatePedidoStatus = (id, nuevoEstado) => {
    const updated = pedidosList.map((p) => (String(p.id) === String(id) ? { ...p, estado: nuevoEstado } : p));
    savePedidos(updated);
    setSuccessMessage('Estado del pedido actualizado');
    setTimeout(() => setSuccessMessage(''), 2500);
  };

  // cargar productos para gráfico (para mostrar stock por categoría)
  useEffect(() => {
    let mounted = true;
    const cargar = async () => {
      try {
        const [audRes, mouseRes, teclRes, noteRes] = await Promise.all([
          api.get('/audifono').catch(() => ({ data: [] })),
          api.get('/mouse').catch(() => ({ data: [] })),
          api.get('/teclado').catch(() => ({ data: [] })),
          api.get('/notebook').catch(() => ({ data: [] })),
        ]);
        const todos = [...audRes.data, ...mouseRes.data, ...teclRes.data, ...noteRes.data];
        if (mounted) setProductosForChart(todos);
      } catch (err) {
        console.error('Error cargando productos para gráfico:', err);
      }
    };
    cargar();
    return () => { mounted = false; };
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

        <div className="row">
          <div className="col-12 col-lg-8 mb-4">
            <div className="card" style={{ background: '#071021', border: '1px solid rgba(255,255,255,0.04)' }}>
              <div className="card-body">
                <h5 className="card-title text-light">Stock por categoría</h5>
                <AdminChart products={productosForChart} width={720} />
              </div>
            </div>
          </div>

          <div className="col-12 col-lg-4 mb-4">
            <div className="card" style={{ background: '#071021', border: '1px solid rgba(255,255,255,0.04)' }}>
              <div className="card-body text-light">
                <h5 className="card-title">Resumen rápido</h5>
                <p>Total categorías: <strong>{[...new Set(productosForChart.map(p => p.categoria || p.category || p.tipo || 'Sin categoría'))].length}</strong></p>
                <p>Total productos: <strong>{productosForChart.length}</strong></p>
                <p>Productos con stock 0: <strong>{productosForChart.filter(p => Number(p.stock ?? p.cantidad ?? p.qty ?? 0) <= 0).length}</strong></p>
              </div>
            </div>
          </div>
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
      const endpoints = {
        'Audífono': '/audifono',
        'Mouse': '/mouse',
        'Teclado': '/teclado',
        'Notebook': '/notebook'
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
        const response = await api.post(endpoint, productData);
        
        console.log('Producto creado:', response.data);
        setSuccessMessage('Producto agregado correctamente');
        setErrorMessage('');
        
        // Resetear formulario
        setShowAddForm(false);
        setSelectedCategory('');
        setNewProduct({});
        
        // Recargar la vista para mostrar el nuevo producto
        setView('dashboard');
        setTimeout(() => {
          setView('productos');
          // Limpiar mensaje después de 5 segundos
          setTimeout(() => setSuccessMessage(''), 5000);
        }, 100);
        
      } catch (error) {
        console.error('Error al crear producto:', error);
        setSuccessMessage('');
        
        if (error.response) {
          // El servidor respondió con un código de error
          setErrorMessage(`Error al guardar el producto: ${error.response.data.message || error.response.statusText}`);
        } else if (error.request) {
          // La petición fue hecha pero no hubo respuesta
          setErrorMessage('Error: No se pudo conectar con el servidor. Verifica que el backend esté ejecutándose.');
        } else {
          // Algo pasó al configurar la petición
          setErrorMessage(`Error: ${error.message}`);
        }
        
        // Limpiar mensaje de error después de 5 segundos
        setTimeout(() => setErrorMessage(''), 5000);
      }
    };

    const handleDeleteProduct = async (e) => {
      e.preventDefault();
      
      // Validación
      if (!deleteCategory || !deleteId) {
        alert('Por favor selecciona la categoría e ingresa el ID del producto');
        return;
      }

      // Determinar el endpoint según la categoría
      const endpoints = {
        'Audífono': '/audifono',
        'Mouse': '/mouse',
        'Teclado': '/teclado',
        'Notebook': '/notebook'
      };

      const endpoint = `${endpoints[deleteCategory]}/${deleteId}`;
      
      if (!endpoints[deleteCategory]) {
        alert('Error: Categoría no válida');
        return;
      }

      try {
        await api.delete(endpoint);
        
        setSuccessMessage('✅ Producto eliminado correctamente');
        setErrorMessage('');
        
        // Resetear formulario
        setShowDeleteForm(false);
        setDeleteCategory('');
        setDeleteId('');
        
        // Recargar la vista para actualizar la tabla
        setView('dashboard');
        setTimeout(() => {
          setView('productos');
          // Limpiar mensaje después de 5 segundos
          setTimeout(() => setSuccessMessage(''), 5000);
        }, 100);
        
      } catch (error) {
        console.error('Error al eliminar producto:', error);
        setSuccessMessage('');
        
        if (error.response) {
          if (error.response.status === 404) {
            setErrorMessage('❌ Error: Producto no encontrado');
          } else {
            setErrorMessage(`❌ Error al eliminar el producto: ${error.response.data.message || error.response.statusText}`);
          }
        } else if (error.request) {
          setErrorMessage('❌ Error: No se pudo conectar con el servidor. Verifica que el backend esté ejecutándose.');
        } else {
          setErrorMessage(`❌ Error: ${error.message}`);
        }
        
        // Limpiar mensaje de error después de 5 segundos
        setTimeout(() => setErrorMessage(''), 5000);
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
        {/* Mensajes de éxito y error */}
        {successMessage && (
          <div className="alert alert-success alert-dismissible fade show" role="alert">
            <strong>{successMessage}</strong>
            <button 
              type="button" 
              className="btn-close" 
              onClick={() => setSuccessMessage('')}
              aria-label="Close"
            ></button>
          </div>
        )}
        
        {errorMessage && (
          <div className="alert alert-danger alert-dismissible fade show" role="alert">
            <strong>{errorMessage}</strong>
            <button 
              type="button" 
              className="btn-close" 
              onClick={() => setErrorMessage('')}
              aria-label="Close"
            ></button>
          </div>
        )}

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

  function renderPedidos() {
    const estados = ['Pendiente', 'Procesando', 'Enviado', 'Entregado', 'Cancelado'];

    const handleChangeEstado = (id, e) => {
      updatePedidoStatus(id, e.target.value);
    };

    return (
      <div>
        <h2 className="mb-4">Gestión de Pedidos</h2>

        {successMessage && (
          <div className="alert alert-success alert-dismissible fade show" role="alert">
            <strong>{successMessage}</strong>
            <button type="button" className="btn-close" onClick={() => setSuccessMessage('')} aria-label="Close"></button>
          </div>
        )}

        <div className="card" style={{ backgroundColor: '#0f1724', border: '1px solid rgba(255,255,255,0.04)' }}>
          <div className="card-body">
            <div className="table-responsive">
              <table className="table table-dark table-striped table-hover align-middle">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Cliente</th>
                    <th>Fecha</th>
                    <th>Estado</th>
                    <th>Total</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {pedidosList.length === 0 && (
                    <tr><td colSpan={6} className="text-center">No hay pedidos registrados</td></tr>
                  )}
                  {pedidosList.map(p => (
                    <tr key={p.id}>
                      <td>{p.id}</td>
                      <td>{p.cliente?.nombre || p.cliente || '—'}</td>
                      <td>{p.fecha || p.createdAt || '—'}</td>
                      <td style={{ minWidth: 180 }}>
                        <select className="form-select form-select-sm" value={p.estado} onChange={(e) => handleChangeEstado(p.id, e)}>
                          {estados.map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                      </td>
                      <td>{p.total != null ? `$ ${p.total}` : (p.items ? `$ ${p.items.reduce((a,b)=>a+(b.precio*(b.cantidad||b.qty||1)),0)}` : '—')}</td>
                      <td>
                        <button className="btn btn-sm btn-outline-info" onClick={() => { navigator.clipboard?.writeText(JSON.stringify(p)); setSuccessMessage('Pedido copiado al portapapeles'); setTimeout(()=>setSuccessMessage(''),2000); }}>
                          Copiar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }

  function renderUsuarios() {
    const handleAddUser = async (e) => {
      e.preventDefault();
      
      // Validación básica
      if (!newUser.nombre || !newUser.correo || !newUser.contraseña) {
        setErrorMessage('Por favor completa los campos obligatorios: nombre, correo y contraseña');
        setTimeout(() => setErrorMessage(''), 5000);
        return;
      }

      try {
        // Agregar rol de cliente por defecto
        const userData = {
          ...newUser,
          rol: 'cliente'
        };

        const response = await api.post('/usuario', userData);
        
        console.log('Usuario creado:', response.data);
        setSuccessMessage('Cliente agregado correctamente');
        setErrorMessage('');
        
        // Resetear formulario
        setShowAddUserForm(false);
        setNewUser({});
        
        // Recargar vista
        setView('dashboard');
        setTimeout(() => {
          setView('usuarios');
          setTimeout(() => setSuccessMessage(''), 5000);
        }, 100);
        
      } catch (error) {
        console.error('Error al crear usuario:', error);
        setSuccessMessage('');
        
        if (error.response) {
          setErrorMessage(`Error al guardar el usuario: ${error.response.data.message || error.response.statusText}`);
        } else if (error.request) {
          setErrorMessage('Error: No se pudo conectar con el servidor.');
        } else {
          setErrorMessage(`Error: ${error.message}`);
        }
        
        setTimeout(() => setErrorMessage(''), 5000);
      }
    };

    // helper que elimina por id (usa axios directo para hacer petición completa)
    const deleteUserById = async (id, tipo = 'cliente') => {
      try {
        const rawToken = localStorage.getItem('token');
        const token = typeof rawToken === 'string'
          ? rawToken.replace(/^\s+|\s+$/g, '').replace(/^"|"$/g, '').replace(/\r|\n/g, '')
          : rawToken;

        if (!token) throw new Error('NO_TOKEN');

        // construir path: la API usa /cliente/:id
        const path = `/cliente/${id}`;
        const base = import.meta.env.VITE_API_URL || 'http://localhost:8080';
        const url = `${base}${path}`;

        const res = await axios.delete(url, { headers: { Authorization: `Bearer ${token}` } });
        return res;
      } catch (err) {
        throw err;
      }
    };

    const handleDeleteUser = async (e) => {
      e.preventDefault();

      if (!deleteUserId) {
        setErrorMessage('Por favor ingresa el ID del usuario');
        setTimeout(() => setErrorMessage(''), 5000);
        return;
      }

      if (!window.confirm(`¿Estás seguro de eliminar el usuario con ID ${deleteUserId}?`)) return;

      try {
        await deleteUserById(deleteUserId, 'cliente');
        setSuccessMessage('Usuario eliminado correctamente');
        setErrorMessage('');
        setShowDeleteUserForm(false);
        setDeleteUserId('');

        setView('dashboard');
        setTimeout(() => {
          setView('usuarios');
          setTimeout(() => setSuccessMessage(''), 5000);
        }, 100);
      } catch (error) {
        console.error('Error al eliminar usuario:', error);
        setSuccessMessage('');

        if (error.message === 'NO_TOKEN') {
          setErrorMessage('No se encontró token de autenticación. Vuelve a iniciar sesión.');
        } else if (error.response) {
          if (error.response.status === 403) {
            const rolActual = currentUser?.rol || 'desconocido';
            setErrorMessage(`No autorizado (403). Tu rol: ${rolActual}. Verifica que estés autenticado como admin y que el token sea válido.`);
          } else if (error.response.status === 404) {
            setErrorMessage('Error: Usuario no encontrado');
          } else {
            const serverMsg = error.response.data?.message || error.response.statusText || String(error.response.status);
            setErrorMessage(`Error al eliminar el usuario: ${serverMsg}`);
          }
        } else if (error.request) {
          setErrorMessage('Error: No se pudo conectar con el servidor.');
        } else {
          setErrorMessage(`Error: ${error.message}`);
        }

        setTimeout(() => setErrorMessage(''), 7000);
      }
    };

    const handleUserInputChange = (campo, valor) => {
      setNewUser(prev => ({ ...prev, [campo]: valor }));
    };

    return (
      <div>
        <h2 className="mb-4">Gestión de Usuarios</h2>
        
        {/* Mensajes de éxito y error */}
        {successMessage && (
          <div className="alert alert-success alert-dismissible fade show" role="alert">
            <strong>{successMessage}</strong>
            <button 
              type="button" 
              className="btn-close" 
              onClick={() => setSuccessMessage('')}
              aria-label="Close"
            ></button>
          </div>
        )}
        
        {errorMessage && (
          <div className="alert alert-danger alert-dismissible fade show" role="alert">
            <strong>{errorMessage}</strong>
            <button 
              type="button" 
              className="btn-close" 
              onClick={() => setErrorMessage('')}
              aria-label="Close"
            ></button>
          </div>
        )}

        {/* Botones de acción */}
        <div className="d-flex justify-content-between align-items-center mb-4 gap-2">
          <button 
            className="btn btn-success"
            onClick={() => {
              setShowAddUserForm(!showAddUserForm);
              if (showDeleteUserForm) setShowDeleteUserForm(false);
            }}
          >
            <i className="bi bi-plus-lg me-1"></i>
            {showAddUserForm ? 'Cancelar' : 'Agregar Cliente'}
          </button>
          <button 
            className="btn btn-danger"
            onClick={() => {
              setShowDeleteUserForm(!showDeleteUserForm);
              if (showAddUserForm) setShowAddUserForm(false);
            }}
          >
            <i className="bi bi-trash me-1"></i>
            {showDeleteUserForm ? 'Cancelar' : 'Eliminar Usuario'}
          </button>
        </div>

        {/* Formulario agregar cliente */}
        {showAddUserForm && (
          <div className="card mb-4" style={{ backgroundColor: '#1a1f2e', border: '1px solid #00ffea' }}>
            <div className="card-body">
              <h5 className="card-title text-light mb-3">Nuevo Cliente</h5>
              
              <form onSubmit={handleAddUser}>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label text-light">Nombre *</label>
                    <input
                      type="text"
                      className="form-control"
                      value={newUser.nombre || ''}
                      onChange={(e) => handleUserInputChange('nombre', e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="col-md-6">
                    <label className="form-label text-light">Apellido</label>
                    <input
                      type="text"
                      className="form-control"
                      value={newUser.apellido || ''}
                      onChange={(e) => handleUserInputChange('apellido', e.target.value)}
                    />
                  </div>
                  
                  <div className="col-md-6">
                    <label className="form-label text-light">Correo *</label>
                    <input
                      type="email"
                      className="form-control"
                      value={newUser.correo || ''}
                      onChange={(e) => handleUserInputChange('correo', e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="col-md-6">
                    <label className="form-label text-light">Usuario</label>
                    <input
                      type="text"
                      className="form-control"
                      value={newUser.usuario || ''}
                      onChange={(e) => handleUserInputChange('usuario', e.target.value)}
                    />
                  </div>
                  
                  <div className="col-md-6">
                    <label className="form-label text-light">Contraseña *</label>
                    <input
                      type="password"
                      className="form-control"
                      value={newUser.contraseña || ''}
                      onChange={(e) => handleUserInputChange('contraseña', e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="col-md-6">
                    <label className="form-label text-light">Teléfono</label>
                    <input
                      type="text"
                      className="form-control"
                      value={newUser.telefono || ''}
                      onChange={(e) => handleUserInputChange('telefono', e.target.value)}
                    />
                  </div>
                  
                  <div className="col-12">
                    <label className="form-label text-light">Dirección</label>
                    <input
                      type="text"
                      className="form-control"
                      value={newUser.direccion || ''}
                      onChange={(e) => handleUserInputChange('direccion', e.target.value)}
                    />
                  </div>
                  
                  <div className="col-md-6">
                    <label className="form-label text-light">Comuna</label>
                    <input
                      type="text"
                      className="form-control"
                      value={newUser.comuna || ''}
                      onChange={(e) => handleUserInputChange('comuna', e.target.value)}
                    />
                  </div>
                  
                  <div className="col-md-6">
                    <label className="form-label text-light">Región</label>
                    <input
                      type="text"
                      className="form-control"
                      value={newUser.region || ''}
                      onChange={(e) => handleUserInputChange('region', e.target.value)}
                    />
                  </div>
                </div>

                <div className="mt-4 d-flex gap-2">
                  <button type="submit" className="btn btn-primary">
                    <i className="bi bi-save me-1"></i>
                    Guardar Cliente
                  </button>
                  <button 
                    type="button" 
                    className="btn btn-outline-secondary"
                    onClick={() => {
                      setShowAddUserForm(false);
                      setNewUser({});
                    }}
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Formulario eliminar usuario */}
        {showDeleteUserForm && (
          <div className="card mb-4" style={{ backgroundColor: '#1a1f2e', border: '1px solid #dc3545' }}>
            <div className="card-body">
              <h5 className="card-title text-light mb-3">
                <i className="bi bi-trash me-2"></i>
                Eliminar Usuario
              </h5>
              
              <form onSubmit={handleDeleteUser}>
                <div className="row g-3">
                  <div className="col-md-12">
                    <label className="form-label text-light">ID del Usuario *</label>
                    <input
                      type="number"
                      className="form-control"
                      value={deleteUserId}
                      onChange={(e) => setDeleteUserId(e.target.value)}
                      placeholder="Ingresa el ID del usuario"
                      required
                      min="1"
                    />
                  </div>
                </div>

                <div className="alert alert-warning mt-3 mb-0">
                  <i className="bi bi-exclamation-triangle me-2"></i>
                  <strong>Advertencia:</strong> Esta acción no se puede deshacer. El usuario será eliminado permanentemente de la base de datos.
                </div>

                <div className="mt-4 d-flex gap-2">
                  <button type="submit" className="btn btn-danger">
                    <i className="bi bi-trash me-1"></i>
                    Eliminar Usuario
                  </button>
                  <button 
                    type="button" 
                    className="btn btn-outline-secondary"
                    onClick={() => {
                      setShowDeleteUserForm(false);
                      setDeleteUserId('');
                    }}
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
        
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

          {(rol === 'admin') && (
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