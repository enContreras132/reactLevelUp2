import { describe, it, expect } from 'vitest';

function esCorreoValido(correo) {
  return correo.includes('@') && correo.includes('.');
}

describe('Validación de correo', () => {
  it('debe validar correos válidos', () => {
    expect(esCorreoValido('usuario@email.com')).toBe(true);
    expect(esCorreoValido('test.user@dominio.cl')).toBe(true);
    expect(esCorreoValido('a@b.co')).toBe(true);
  });

  it('debe rechazar correos inválidos', () => {
    expect(esCorreoValido('usuarioemailcom')).toBe(false);
    expect(esCorreoValido('usuario@emailcom')).toBe(false);
    expect(esCorreoValido('usuariodominio.cl')).toBe(false);
    expect(esCorreoValido('usuario@dominio')).toBe(false);
  });
});
