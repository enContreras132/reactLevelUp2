import React from 'react'
import { Routes, Route, Outlet } from 'react-router-dom'
import Footer from './components/Footer'
import Header from './components/Header'
import HomePage from './pages/HomePage'
import ProductoPages from './pages/ProductoPages'
import AboutPage from './pages/AboutPage.jsx'
import SingleProduct from './Components/SingleProduct.jsx'
import CartPage from './pages/CartPage.jsx'
import Registro from './Components/Registro.jsx'
import LoginPage from './pages/LoginPage.jsx'
import AdminPage from './pages/AdminPage.jsx'
// Layout principal: renderiza Header + Outlet (ruta hija) + Footer
function Layout() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}

// Layout que sólo muestra el Header (NO muestra Footer)
// Usar este layout para páginas que deben estar sin footer
function HeaderOnlyLayout() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
    </>
  )
}

function App() {
  return (
    <Routes>
      {/* 
        Rutas que usan Layout (Header + Footer)
        !Todas las rutas aquí dentro renderizan Header arriba y Footer abajo.
      */}
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/productos" element={<ProductoPages />} />
        <Route path="/sobrenosotros" element={<AboutPage />} />
        <Route path="/producto/:id" element={<SingleProduct />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/registro" element={<Registro />} />
      </Route>

      {/*
        Rutas que usan sólo Header:
         Se agrupan bajo HeaderOnlyLayout para mostrar Header pero NO Footer.
         Añadir aquí las rutas que deben compartir sólo el header.
      */}
      <Route element={<HeaderOnlyLayout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin" element={<AdminPage />} />
      </Route>

      {/* Ruta fallback (404) */}
      <Route path="*" element={<div style={{ padding: 20 }}>Página no encontrada</div>} />
    </Routes>
  )
}

export default App