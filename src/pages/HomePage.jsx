import React from 'react';
import Carrusel from '../Components/MyCarrusel.jsx';
import Ofertas from '../Components/MyOfertas.jsx';
import Separador from '../Components/MySeparador.jsx';
import SobreNosotros from '../Components/MySobreNosotros.jsx';

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
