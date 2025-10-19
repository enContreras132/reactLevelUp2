import { useState } from 'react'
import './assets/css/style.css'
import './assets/css/bootstrap.css'

import Header from './components/Header.jsx'
import CartPage from './pages/CartPage';
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Header />
      
    </>
  )
}

export default App
