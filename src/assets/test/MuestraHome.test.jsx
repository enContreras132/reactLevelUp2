import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import Header from '../../components/Header';
import { CartProvider } from '../../context/CartContext';

describe('Header - Link a Home', () => {
  it('debe navegar a "/" al hacer click en el logo/Level Up', () => {
    render(
      <MemoryRouter initialEntries={["/productos"]}>
        <CartProvider>
          <Header />
        </CartProvider>
        <Routes>
          <Route path="/" element={<div data-testid="home">Home</div>} />
          <Route path="/productos" element={<div data-testid="productos">Productos</div>} />
        </Routes>
      </MemoryRouter>
    );

    // Verificamos que iniciamos en /productos
    expect(screen.getByTestId('productos')).toBeTruthy();

    // Click en el brand (logo + texto Level Up)
    const brandLink = screen.getByRole('link', { name: /level up/i });
    fireEvent.click(brandLink);

    // Debe renderizar la ruta home
    expect(screen.getByTestId('home')).toBeTruthy();
  });
});