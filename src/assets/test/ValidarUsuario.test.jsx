import { describe, it, expect } from 'vitest';

const usuarios = [
  { id: 1, nombre: 'adminadmin', email: 'admin@levelup.com', pass: 'admin123', rol: 'admin' },
  { id: 2, nombre: 'Enzo', email: 'enzo123@gmail.com', pass: 'enzo123', rol: 'cliente' },
  { id: 3, nombre: 'Maximiliano', email: 'maximiliano123@gmail.com', pass: 'maxi123', rol: 'cliente' }
];

function validarUsuario(identifier, password) {
  return usuarios.find(
    (u) =>
      (u.email.toLowerCase() === identifier.toLowerCase() ||
        u.nombre.toLowerCase() === identifier.toLowerCase()) &&
      u.pass === password
  );
}

describe('Validación de usuarios', () => {
  it('debe validar usuario admin por nombre y contraseña', () => {
    expect(validarUsuario('adminadmin', 'admin123')).toEqual(usuarios[0]);
  });
  it('debe validar usuario admin por email y contraseña', () => {
    expect(validarUsuario('admin@levelup.com', 'admin123')).toEqual(usuarios[0]);
  });
  it('debe validar usuario Enzo por nombre y contraseña', () => {
    expect(validarUsuario('Enzo', 'enzo123')).toEqual(usuarios[1]);
  });
  it('debe validar usuario Enzo por email y contraseña', () => {
    expect(validarUsuario('enzo123@gmail.com', 'enzo123')).toEqual(usuarios[1]);
  });
  it('debe validar usuario Maximiliano por nombre y contraseña', () => {
    expect(validarUsuario('Maximiliano', 'maxi123')).toEqual(usuarios[2]);
  });
  it('debe validar usuario Maximiliano por email y contraseña', () => {
    expect(validarUsuario('maximiliano123@gmail.com', 'maxi123')).toEqual(usuarios[2]);
  });
  it('debe rechazar usuario con datos incorrectos', () => {
    expect(validarUsuario('adminadmin', 'wrongpass')).toBeUndefined();
    expect(validarUsuario('noexiste', 'admin123')).toBeUndefined();
    expect(validarUsuario('enzo123@gmail.com', 'wrongpass')).toBeUndefined();
  });
});
