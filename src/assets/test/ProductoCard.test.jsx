import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Productos from '../../Components/Productos';
import { CartProvider } from '../../context/CartContext';

// Helper para renderizar con providers necesarios
const renderWithProviders = (component) => {
  return render(
    <BrowserRouter>
      <CartProvider>
        {component}
      </CartProvider>
    </BrowserRouter>
  );
};

describe('Prueba sobre Productos.jsx', () => {
  
  it('debe renderizar correctamente las tarjetas de productos', () => {
    const { container } = renderWithProviders(<Productos />);
    
    // Verificar que el título principal se muestra
    const titulo = screen.queryByText('Productos Disponibles');
    expect(titulo).toBeTruthy();
    
    // Verificar que hay tarjetas de productos renderizadas
    const productCards = container.querySelectorAll('.box');
    expect(productCards.length).toBeGreaterThan(0);
    
    // Verificar estructura de la primera tarjeta
    const firstCard = productCards[0];
    expect(firstCard.querySelector('.img-box')).toBeTruthy();
    expect(firstCard.querySelector('.detail-box')).toBeTruthy();
    expect(firstCard.querySelector('h5')).toBeTruthy(); // nombre del producto
    expect(firstCard.querySelector('h6')).toBeTruthy(); // precio
    expect(firstCard.querySelector('img')).toBeTruthy(); // imagen
  });

});
