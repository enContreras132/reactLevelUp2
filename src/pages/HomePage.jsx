import React from 'react';
import Carrusel from '../common/MyCarrusel.jsx';
import Ofertas from '../common/MyOfertas.jsx';
import Separador from '../common/MySeparador.jsx';
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
