import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Footer from './components/Footer'
import Header from './components/Header'
import HomePage from './pages/HomePage'
import SobreNosotros from './components/SobreNosotros'
import Separador from './components/Separador'


function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<><HomePage /><Separador /></>} />
        <Route path="/sobrenosotros" element={<SobreNosotros />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App