import React from 'react';
import Carrusel from '../Components/Carrusel.jsx';
import Ofertas from '../Components/Ofertas.jsx';
import Separador from '../Components/Separador.jsx';
import SobreNosotros from '../components/SobreNosotros.jsx';

const HomePage = () => {
  return (
    <div>
      <Carrusel />
      <Ofertas />
      <Separador />
      <SobreNosotros />
    </div>
  );
};

export default HomePage;
