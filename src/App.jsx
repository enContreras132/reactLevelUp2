import { useState } from 'react'



import Header from './components/Header.jsx'
import CartPage from './components/Carrito.jsx';
import Home from './components/Home.jsx'
import Footer from './components/Footer.jsx';
import { Routes, Route } from 'react-router-dom';



function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Header />
      <Home />
      <Footer />
    </>
  )
}

export default App
