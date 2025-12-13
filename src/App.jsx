import React from 'react'
import { Routes, Route, Outlet } from 'react-router-dom'
import Footer from './common/MyFooter.jsx'
import Header from './common/MyHeader.jsx'
import HomePage from './pages/HomePage'
import ProductoPages from './pages/ProductoPages'
import AboutPage from './pages/AboutPage.jsx'
import SingleProduct from './common/MySingleProduct.jsx'
import CartPage from './pages/CartPage.jsx'
import Registro from './common/MyRegistro.jsx'
import LoginPage from './pages/LoginPage.jsx'
import AdminPage from './pages/AdminPage.jsx'
import CheckoutPage from './pages/CheckoutPage.jsx'
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
      */}
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/productos" element={<ProductoPages />} />
        <Route path="/sobrenosotros" element={<AboutPage />} />
        <Route path="/mouse/:id" element={<SingleProduct />} />
        <Route path="/audifono/:id" element={<SingleProduct />} />
        <Route path="/audifonos/:id" element={<SingleProduct />} />
        <Route path="/teclado/:id" element={<SingleProduct />} />
        <Route path="/notebook/:id" element={<SingleProduct />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/registro" element={<Registro />} />
      </Route>

      {/*
        Rutas que usan sólo Header:
      */}
      <Route element={<HeaderOnlyLayout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin" element={<AdminPage />} />
      </Route>

      {/* Ruta error (404) */}
      <Route path="*" element={<div style={{ padding: 20 }}>Página no encontrada</div>} />
    </Routes>
  )
}

export default App