import React from 'react';
import Carrusel from '../common/MyCarrusel.js';
import Ofertas from '../common/MyOfertas.js';
import Separador from '../common/MySeparador.js';
import SobreNosotros from '../common/MySobreNosotros.jsx';

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
