import { describe, it, expect } from 'vitest';

function esMayorDeEdad(fechaNacimiento) {
  const hoy = new Date();
  const nacimiento = new Date(fechaNacimiento);
  let edad = hoy.getFullYear() - nacimiento.getFullYear();
  const m = hoy.getMonth() - nacimiento.getMonth();
  if (m < 0 || (m === 0 && hoy.getDate() < nacimiento.getDate())) {
    edad--;
  }
  return edad >= 18;
}

describe('Validación de mayoría de edad', () => {
  it('debe validar usuarios mayores de 18 años', () => {
    expect(esMayorDeEdad('2000-01-01')).toBe(true);
    expect(esMayorDeEdad('1995-12-31')).toBe(true);
  });

  it('debe rechazar usuarios menores de 18 años', () => {
    expect(esMayorDeEdad('2010-05-20')).toBe(false);
    expect(esMayorDeEdad('2020-11-02')).toBe(false);
  });
});
