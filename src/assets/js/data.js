
// USUARIOS CON ROLES DEFINIDOS
// Aquí es donde el login buscará si el usuario y la contraseña son correctos.
export const usuarios = [
  { id: 1, nombre: 'adminadmin', email: 'admin@levelup.com', pass: 'admin123', rol: 'admin' },
  { id: 2, nombre: 'enzo (Pedidos)', email: 'pedidos@levelup.com', pass: 'pedidos123', rol: 'pedidos' },
  { id: 3, nombre: 'Maxi (Stock)', email: 'inventario@levelup.com', pass: 'stock123', rol: 'inventario' }
];

//  PRODUCTOS GAMERS no reales
// Datos de productos falsos en admin.
export const productos = [
  { id: 'RTX4090', nombre: 'NVIDIA GeForce RTX 4090', categoria: 'Tarjetas de Video', stock: 12, precio: 1899990 },
  { id: 'I9-13900K', nombre: 'Intel Core i9-13900K', categoria: 'Procesadores', stock: 25, precio: 649990 },
  { id: 'HYP-CLOUDII', nombre: 'HyperX Cloud II Wireless', categoria: 'Audífonos', stock: 40, precio: 129990 },
  { id: 'LOGI-G502', nombre: 'Logitech G502 HERO', categoria: 'Mouses', stock: 8, precio: 49990 },
  { id: 'RAZER-Huntsman', nombre: 'Razer Huntsman Mini', categoria: 'Teclados', stock: 30, precio: 99990 }
];


// PEDIDOS DE CLIENTES DE EJEMPLO
// Tabla pedidos falsa en panel de admin.
export const pedidos = [
  { id: 2024001, cliente: 'Bastian Muñoz', fecha: '2025-10-12', estado: 'Procesando', total: 129990 },
  { id: 2024002, cliente: 'Javiera Gonzalez', fecha: '2025-10-11', estado: 'Enviado', total: 1949980 },
  { id: 2024003, cliente: 'Matias Rojas', fecha: '2025-10-12', estado: 'Pendiente', total: 49990 },
  { id: 2024004, cliente: 'Carla Nuñez', fecha: '2025-10-10', estado: 'Entregado', total: 649990 }
];