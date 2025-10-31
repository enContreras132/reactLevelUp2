import { useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Footer from './components/Footer'
import Header from './components/Header'
import HomePage from './pages/HomePage'
import ProductoPages from './pages/ProductoPages'
import AboutPage from './pages/AboutPage.jsx'
import SingleProduct from './Components/SingleProduct.jsx'
import CartPage from './pages/CartPage.jsx'
import Registro from './Components/Registro.jsx'
import LoginPage from './pages/LoginPage.jsx'

function App() {

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/productos" element={<ProductoPages />} />
        <Route path="/sobrenosotros" element={<AboutPage />} />
        <Route path="/producto/:id" element={<SingleProduct />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App