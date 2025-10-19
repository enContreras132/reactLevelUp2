import { useState } from 'react'
import './assets/css/style.css'
import './assets/css/bootstrap.css'

import Header from './components/Header.jsx'
import CartPage from './pages/CartPage';
import ProductDetailPage from './pages/ProductDetailPage'
import HomePage from './pages/HomePage.jsx'
import ProductPage from './pages/ProductPage.jsx';




function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Header />
      
    </>
  )
}

export default App
