<<<<<<< Updated upstream
import { useState } from 'react'



import Header from './components/Header.jsx'
import CartPage from './components/Carrito.jsx';
import Home from './components/Home.jsx'
import Footer from './components/Footer.jsx';
import { Routes, Route } from 'react-router-dom';
=======
import React, { useState, useEffect, createContext, useContext, useMemo } from 'react';
import { Routes, Route, Outlet, Link, NavLink, useParams, useNavigate, Navigate } from 'react-router-dom';
import { Navbar, Nav, Container, Carousel } from 'react-bootstrap';

// =================================================================
// 1. DATOS DE LA APLICACIÓN (Tu "Base de Datos" local)
// =================================================================
const productosData = [
    { id: 1, nombre: "Mouse Gamer Monster RGB", precio: 7590, imagen: "https://i.bolder.run/r/czozMjIxLGc6NjkweA/477efa0d/711248-Mouse_B1.png", categoria: "mouse", descripcion: "Mouse Gamer Monster con DPI: 800/1600/2400/3200/4000/8000, RGB, Cable trenzado de 1.5m y 6 Botones.", caracteristicas: ["DPI: 8000 max", "Iluminación RGB", "Cable trenzado (1.5m)", "6 Botones"], caja_incluye: ["Mouse Gamer Monster RGB", "Manual de usuario"] },
    { id: 2, nombre: "Audifonos Gamer Monster", precio: 5990, imagen: "https://i.bolder.run/r/czozMjIxLGc6NjkweA/424c2d92/710300-1_%283%29.png", categoria: "audifono", descripcion: "Audífonos Gamer Monster Loud 550BK. Formato Headset, con micrófono, compatible con Ps4 / Nswitch / X-one.", caracteristicas: ["Formato: Headset", "Con micrófono: Sí", "Es gamer: Sí", "Compatible con Consolas"], caja_incluye: ["Audifonos Gamer Monster", "Cable adaptador para PC"] },
    { id: 4, nombre: "Gamer Nitro V15 RTX 2050", precio: 699990, imagen: "https://www.acerstore.cl/cdn/shop/files/1_ANV15-51-53W1-1.png?v=1753392522&width=533", categoria: "notebook", descripcion: "Notebook gamer con Windows 11, 512GB de almacenamiento, 16GB RAM y pantalla FHD de 15,6 pulgadas.", caracteristicas: ["NVIDIA® GeForce RTX™ 2050", "Intel® Core™ i5", "Pantalla 15.6\" Full HD", "16 GB RAM", "512GB SSD"], caja_incluye: ["Notebook Gamer Nitro V15", "Cargador"] },
    { id: 5, nombre: "Teclado Gamer Redragon Kumara", precio: 49990, imagen: "https://i.bolder.run/r/czozMjIxLGc6NjkweA/2d37a7fc/736207-Kumara1.png", categoria: "teclado", descripcion: "La iluminación del Kumara K-552 RGB consta de teclas retroiluminadas configurables mediante software independiente.", caracteristicas: ["Formato: TKL", "Retroiluminación: RGB", "Memoria interna", "Construcción robusta"], caja_incluye: ["Teclado Redragon Kumara", "Manual"] },
];
const usuarios = [
  { id: 1, nombre: 'adminadmin', email: 'admin@levelup.com', pass: 'admin123', rol: 'admin' },
  { id: 2, nombre: 'enzo (Pedidos)', email: 'pedidos@levelup.com', pass: 'pedidos123', rol: 'pedidos' },
];

// =================================================================
// 2. "CEREBROS" GLOBALES (CONTEXTOS)
// =================================================================
const CartContext = createContext();
export const CartProvider = ({ children }) => { // EXPORTAMOS el Provider para que main.jsx lo use
    const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem('carrito')) || []);
    useEffect(() => { localStorage.setItem('carrito', JSON.stringify(cart)); }, [cart]);
    
    const addItem = (product, cantidad = 1) => {
        setCart(prev => {
            const exist = prev.find(item => item.id === product.id);
            if (exist) return prev.map(item => item.id === product.id ? { ...item, cantidad: item.cantidad + cantidad } : item);
            return [...prev, { ...product, cantidad }];
        });
    };
    const removeItem = (productId) => setCart(prev => prev.filter(item => item.id !== productId));
    const updateQuantity = (productId, newQuantity) => {
        const numQuantity = parseInt(newQuantity);
        if (numQuantity > 0) {
            setCart(prev => prev.map(item => item.id === productId ? { ...item, cantidad: numQuantity } : item));
        }
    };
    const clearCart = () => setCart([]);
    const totalItems = useMemo(() => cart.reduce((sum, item) => sum + item.cantidad, 0), [cart]);
    const totalPrice = useMemo(() => cart.reduce((sum, item) => sum + item.precio * item.cantidad, 0), [cart]);
>>>>>>> Stashed changes

    const value = { cart, addItem, removeItem, updateQuantity, clearCart, totalItems, totalPrice };
    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
const useCart = () => useContext(CartContext);

const AuthContext = createContext();
export const AuthProvider = ({ children }) => { // EXPORTAMOS el Provider para que main.jsx lo use
    const [currentUser, setCurrentUser] = useState(() => JSON.parse(sessionStorage.getItem('currentUser')) || null);
    useEffect(() => {
        if (currentUser) sessionStorage.setItem('currentUser', JSON.stringify(currentUser));
        else sessionStorage.removeItem('currentUser');
    }, [currentUser]);

    const login = (email, password) => {
        const user = usuarios.find(u => u.email === email && u.pass === password);
        if (user) { setCurrentUser(user); return true; }
        return false;
    };
    const logout = () => setCurrentUser(null);
    const isAuthenticated = !!currentUser;

    const value = { currentUser, login, logout, isAuthenticated };
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
const useAuth = () => useContext(AuthContext);

// =================================================================
// 3. COMPONENTES REUTILIZABLES ("LADRILLOS")
// =================================================================
const Header = () => {
    const { totalItems } = useCart();
    return (
        <header className="header_section">
            <Container>
                <Navbar expand="lg" className="custom_nav-container">
                    <Navbar.Brand as={Link} to="/"><span>Level Up</span></Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarSupportedContent" />
                    <Navbar.Collapse id="navbarSupportedContent">
                        <Nav className="mx-auto">
                            <Nav.Link as={NavLink} to="/" end>Pagina Principal</Nav.Link>
                            <Nav.Link as={NavLink} to="/productos">Productos</Nav.Link>
                            {/* <Nav.Link as={NavLink} to="/about">Nosotros</Nav.Link> */}
                        </Nav>
                        <div className="user_option">
                            <Link to="/login" className="user_link"><i className="fa fa-user" aria-hidden="true"></i></Link>
                            <Link to="/carrito" className="cart_link">
                                <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 456 456" style={{ enableBackground: 'new 0 0 456 456' }}><path d="M0 24C0 10.7 10.7 0 24 0H69.5c10.3 0 19.4 6.6 22.6 16.4L96 32H552c13.3 0 24 10.7 24 24c0 2.6-.4 5.1-1.2 7.5l-72 240c-4.3 14.2-17.2 24-32 24H164.5l5.4 24H496c13.3 0 24 10.7 24 24s-10.7 24-24 24H152c-10.3 0-19.4-6.6-22.6-16.4L81.2 54.5 69.5 16H24C10.7 16 0 10.7 0 24zm160 400a48 48 0 1 1 96 0 48 48 0 1 1-96 0zm288 0a48 48 0 1 1 96 0 48 48 0 1 1-96 0z"/></svg>
                                {totalItems > 0 && <span className="cart-count">{totalItems}</span>}
                            </Link>
                        </div>
                    </Navbar.Collapse>
                </Navbar>
            </Container>
        </header>
    );
};
const Footer = () => {
    const currentYear = new Date().getFullYear();
    return (
        <footer className="footer_section">
            <Container>
                <div className="row">
                    <div className="col-md-4 footer-col"><h4>Contáctanos</h4><p><i className="fa fa-map-marker" aria-hidden="true"></i> Santiago, Chile</p></div>
                    <div className="col-md-4 footer-col"><h4>Level Up</h4><p>Tu tienda de confianza para componentes y periféricos gamer.</p></div>
                    <div className="col-md-4 footer-col"><h4>Horario</h4><p>Todos los días: 10am - 10pm</p></div>
                </div>
                <div className="footer-info"><p>&copy; {currentYear} Todos los derechos reservados.</p></div>
            </Container>
        </footer>
    );
};
const Slider = () => (
    <section className="slider_section">
        <Carousel>
            <Carousel.Item>
                <Container><div className="row"><div className="col-md-7 col-lg-6"><div className="detail-box"><h1>Level Up Tu Experiencia Gamer</h1><p>Encuentra los mejores periféricos y componentes para llevar tu juego al siguiente nivel.</p><div className="btn-box"><Link to="/productos" className="btn1">Ver Productos</Link></div></div></div></div></Container>
            </Carousel.Item>
        </Carousel>
    </section>
);
const ProductCard = ({ producto }) => {
    const { addItem } = useCart();
    return (
        <div className="col-sm-6 col-lg-4 mb-4">
            <div className="box card h-100 text-center">
                <Link to={`/producto/${producto.id}`}>
                    <div className="img-box card-img-top p-3"><img src={producto.imagen} alt={producto.nombre} className="img-fluid" style={{maxHeight: '160px', objectFit: 'contain'}}/></div>
                </Link>
                <div className="card-body d-flex flex-column">
                    <h5 className="card-title" style={{minHeight: '48px'}}><Link to={`/producto/${producto.id}`}>{producto.nombre}</Link></h5>
                    <div className="options mt-auto">
                        <h6>${producto.precio.toLocaleString('es-CL')}</h6>
                        <button className="btn btn-warning btn-sm" onClick={() => addItem(producto)}>Añadir al Carrito</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

// =================================================================
// 4. PÁGINAS DE LA APLICACIÓN
// =================================================================
const HomePage = () => (
    <><div className="hero_area"><Slider /></div><Container className="my-5"><div className="heading_container heading_center my-5"><h2>Nuestros Productos</h2></div><div className="row">{productosData.map(p => <ProductCard key={p.id} producto={p} />)}</div></Container></>
);
const ProductPage = () => {
    const [filtro, setFiltro] = useState('*');
    const productosFiltrados = (filtro === '*') ? productosData : productosData.filter(p => p.categoria === filtro);
    return (
        <Container className="my-5">
            <div className="heading_container heading_center my-5"><h2>Productos Disponibles</h2></div>
            <ul className="filters_menu">
                <li className={filtro === '*' ? 'active' : ''} onClick={() => setFiltro('*')}>Todo</li>
                <li className={filtro === 'audifono' ? 'active' : ''} onClick={() => setFiltro('audifono')}>Audifonos</li>
                <li className={filtro === 'mouse' ? 'active' : ''} onClick={() => setFiltro('mouse')}>Mouse</li>
                <li className={filtro === 'teclado' ? 'active' : ''} onClick={() => setFiltro('teclado')}>Teclado</li>
                <li className={filtro === 'notebook' ? 'active' : ''} onClick={() => setFiltro('notebook')}>Computadores</li>
            </ul>
            <div className="row mt-4">{productosFiltrados.map(p => <ProductCard key={p.id} producto={p} />)}</div>
        </Container>
    );
};
const ProductDetailPage = () => {
    const { productId } = useParams();
    const product = productosData.find(p => p.id === parseInt(productId));
    const { addItem } = useCart();
    const [cantidad, setCantidad] = useState(1);
    if (!product) return <Container className="my-5 text-center"><h2>Producto no encontrado</h2></Container>;
    return (
        <Container className="my-5"><div className="row"><div className="col-lg-6"><img src={product.imagen} alt={product.nombre} className="img-fluid rounded shadow"/></div><div className="col-lg-6"><h1>{product.nombre}</h1><p className="lead">{product.descripcion}</p><div className="h2 my-3">${product.precio.toLocaleString('es-CL')}</div><h5>Características:</h5><ul>{product.caracteristicas.map((c, i) => <li key={i}>{c}</li>)}</ul><hr/><div className="d-flex align-items-center mt-4"><input type="number" className="form-control" style={{width: '80px'}} value={cantidad} min="1" onChange={e => setCantidad(parseInt(e.target.value))} /><button className="btn btn-primary btn-lg ms-3" onClick={() => {addItem(product, cantidad); alert('Producto añadido');}}>Añadir al Carrito</button></div></div></div></Container>
    );
};
const CartPage = () => {
    const { cart, removeItem, updateQuantity, clearCart, totalPrice } = useCart();
    if (cart.length === 0) return <Container className="my-5 text-center"><h2>Tu carrito está vacío</h2></Container>;
    return (
        <Container className="my-5"><h2>Carrito de Compras</h2><div className="my-4">{cart.map(item => (<div key={item.id} className="d-flex justify-content-between align-items-center p-3 border rounded mb-2"><img src={item.imagen} alt={item.nombre} style={{width: '60px'}} className="rounded" /><span className="fw-bold">{item.nombre}</span><input type="number" min="1" value={item.cantidad} className="form-control" style={{width: '70px'}} onChange={(e) => updateQuantity(item.id, e.target.value)} /><span className="fw-bold">${(item.precio * item.cantidad).toLocaleString('es-CL')}</span><button className="btn btn-danger btn-sm" onClick={() => removeItem(item.id)}>&times;</button></div>))}</div><div className="text-end"><h3>Total: ${totalPrice.toLocaleString('es-CL')}</h3><button className="btn btn-danger me-2" onClick={clearCart}>Vaciar Carrito</button><button className="btn btn-success">Pagar</button></div></Container>
    );
};
const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login, isAuthenticated } = useAuth();
    const navigate = useNavigate();
    useEffect(() => { if (isAuthenticated) navigate('/paneladmin'); }, [isAuthenticated, navigate]);
    const handleSubmit = (e) => { e.preventDefault(); if (!login(email, password)) setError('Usuario o contraseña incorrectos.'); };
    return (<div className="min-h-screen flex items-center justify-center relative overflow-hidden" style={{ background: '#1a1a1a' }}><div className="tarjeta-login p-8 rounded-2xl shadow-2xl max-w-md w-full mx-4 text-center"><h2 className="text-4xl font-bold mb-6" style={{color:'#00ffea', textShadow: '0 0 10px #00ffea'}}>Bienvenido Gamer</h2><form onSubmit={handleSubmit} className="space-y-6"><div><input type="text" value={email} onChange={e => setEmail(e.target.value)} className="campo-input w-full px-4 py-3 rounded-lg" placeholder="Email de usuario" required /></div><div><input type="password" value={password} onChange={e => setPassword(e.target.value)} className="campo-input w-full px-4 py-3 rounded-lg" placeholder="Contraseña" required /></div><button type="submit" className="boton-brillo w-full py-3 rounded-lg">Iniciar Sesión</button><Link to="/" className="boton-brillo block w-full py-3 rounded-lg no-underline mt-3">Pagina Principal</Link></form>{error && (<div className="text-danger mt-3">{error}</div>)}</div></div>);
};
const AdminPage = () => { const { currentUser, logout } = useAuth(); const navigate = useNavigate(); const handleLogout = () => { logout(); navigate('/login'); }; return (<Container className="my-5"><h1>Panel de Admin</h1><p>Bienvenido, {currentUser.nombre}</p><button className="btn btn-danger" onClick={handleLogout}>Cerrar Sesión</button></Container>);};

// =================================================================
// 5. ROUTER Y LAYOUTS
// =================================================================
const PublicLayout = () => (<div className="d-flex flex-column min-vh-100"><Header /><main className="flex-grow-1"><Outlet /></main><Footer /></div>);
const ProtectedRoute = () => { const { isAuthenticated } = useAuth(); return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />; };

// El componente App que une todo
function App() {
  return (
<<<<<<< Updated upstream
    <>
      <Header />
      <Home />
      <Footer />
    </>
  )
=======
      <Routes>
        <Route path="/" element={<PublicLayout />}>
          <Route index element={<HomePage />} />
          <Route path="productos" element={<ProductPage />} />
          <Route path="producto/:productId" element={<ProductDetailPage />} />
          <Route path="carrito" element={<CartPage />} />
        </Route>
        <Route path="login" element={<LoginPage />} />
        <Route element={<ProtectedRoute />}><Route path="paneladmin" element={<AdminPage />} /></Route>
        <Route path="*" element={<Container className="text-center my-5"><h1>404: Página No Encontrada</h1></Container>} />
      </Routes>
  );
>>>>>>> Stashed changes
}

export default App;

