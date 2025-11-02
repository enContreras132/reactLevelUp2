import { describe, it, expect } from 'vitest';

function esCorreoDuoc(email) {
  return /@duocuc\.cl$/i.test(email);
}

function calcularTotalConDescuento(email, total) {
  if (esCorreoDuoc(email)) {
    return total * 0.8;
  }
  return total;
}

describe('Descuento para correo DUOC', () => {
  it('aplica 20% de descuento si el correo es DUOC', () => {
    expect(calcularTotalConDescuento('usuario@duocuc.cl', 10000)).toBe(8000);
    expect(calcularTotalConDescuento('test@duocuc.cl', 50000)).toBe(40000);
  });

  it('no aplica descuento si el correo no es DUOC', () => {
    expect(calcularTotalConDescuento('usuario@gmail.com', 10000)).toBe(10000);
    expect(calcularTotalConDescuento('test@levelup.com', 50000)).toBe(50000);
  });
});
