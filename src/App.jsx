import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Footer from './components/Footer'
import Header from './components/Header'
import HomePage from './pages/HomePage'
import ProductoPages from './pages/ProductoPages'
import AboutPage from './pages/AboutPage.jsx'
import SingleProduct from './Components/SingleProduct.jsx'



function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/productos" element={<ProductoPages />} />
        <Route path="/sobrenosotros" element={<AboutPage />} />
        <Route path="/producto/:id" element={<SingleProduct />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App