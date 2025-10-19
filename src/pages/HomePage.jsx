import React from 'react';


import Slider from '../components/slider';
import ProductList from '../components/ProductList'; 
import Ofertas from '../components/Ofertas';
import Separador from '../components/Separador';
import About from '../components/About';


function HomePage() {
  
  return (
    
    <> 
      <Slider />
      <Ofertas />    
      <Separador />              
      <ProductList /> 
      <About /> 
      
    </>
  );
}

export default HomePage;