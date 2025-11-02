import { describe, it, expect } from 'vitest';

function esTelefonoChilenoValido(telefono) {
  return /^\+569\d{8}$/.test(telefono);
}

describe('Validación de teléfono chileno', () => {
  it('debe validar teléfonos chilenos válidos', () => {
    expect(esTelefonoChilenoValido('+56912345678')).toBe(true);
    expect(esTelefonoChilenoValido('+56987654321')).toBe(true);
  });

  it('debe rechazar teléfonos inválidos', () => {
    expect(esTelefonoChilenoValido('56912345678')).toBe(false); // falta el +
    expect(esTelefonoChilenoValido('+5691234567')).toBe(false); // solo 7 dígitos
    expect(esTelefonoChilenoValido('+569123456789')).toBe(false); // 9 dígitos
    expect(esTelefonoChilenoValido('+56812345678')).toBe(false); // no es 569
    expect(esTelefonoChilenoValido('+569abcdefgh')).toBe(false); // no son dígitos
  });
});
