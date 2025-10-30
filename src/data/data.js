// USUARIOS CON ROLES DEFINIDOS
// Aquí es donde el login buscará si el usuario y la contraseña son correctos.
export const usuarios = [
  { id: 1, nombre: 'adminadmin', email: 'admin@levelup.com', pass: 'admin123', rol: 'admin' },
  { id: 2, nombre: 'enzo (Pedidos)', email: 'pedidos@levelup.com', pass: 'pedidos123', rol: 'pedidos' },
  { id: 3, nombre: 'Maxi (Stock)', email: 'inventario@levelup.com', pass: 'stock123', rol: 'inventario' }
];

//  PRODUCTOS GAMERS no reales
// Datos de productos falsos en admin.
const productosData = [
    {
        id: 1,
        nombre: "Mouse Gamer Monster RGB",
        categoria: "Mouse",
        marca: "Monster",
        precio: 7590,
        stock: 25,
        inalambrico: "No",
        color: "Negro",
        botonesCanti: 6,
        dpi: 3200,
        descripcion: "Mouse Gamer Monster RGB Wired. Diseño ergonómico con iluminación RGB personalizable y 6 botones programables.",
        imagen: "https://i.bolder.run/r/czozMjIxLGc6NjkweA/477efa0d/711248-Mouse_B1.png",

    },
    {
        id: 2,
        nombre: "Audifonos Gamer Monster",
        categoria: "Audífonos",
        marca: "Monster",
        precio: 5990,
        stock: 35,
        inalambrico: "No",
        color: "Negro",
        tipo: "Headset",
        frecuenciaRespuesta: "20Hz-20kHz",
        imagen: "https://i.bolder.run/r/czozMjIxLGc6NjkweA/424c2d92/710300-1_%283%29.png",
        descripcion: "Audífonos Gamer Monster Loud 550BK. Formato Headset, con micrófono, compatible con Ps4 / Nswitch / X-one.",

    },
    {
        id: 3,
        nombre: "Mouse Razer Cobra Pro HyperSpeed",
        marca: "Razer",
        precio: 124640,
        stock: 15,
        inalambrico: "Sí",
        color: "Negro",
        botonesCanti: 5,
        dpiMin: 2000,
        dpiMax: 20000,
        imagen: "https://www.winpy.cl/files/w38389_razer_cobra_pro_hyperspeed_00.jpg",
        descripcion: "El Razer Cobra Pro HyperSpeed es un mouse gamer inalámbrico que ofrece una precisión excepcional y una conectividad sin interrupciones gracias a la tecnología HyperSpeed de Razer.",
        
    },
    {
        id: 4,
        nombre: "Gamer Nitro V15 RTX 2050",
        categoria: "Notebook",
        marca: "Acer",
        precio: 699990,
        stock: 10,
        procesador: "Intel Core i5-12500H",
        ram: "16GB",
        memoria: "512GB SSD",
        pantalla: "15.6'' FHD 144Hz",
        tarjetaGrafica: "NVIDIA GeForce RTX 2050",
        imagen: "https://www.acerstore.cl/cdn/shop/files/1_ANV15-51-53W1-1.png?v=1753392522&width=533",
        descripcion: "Notebook gamer con Windows 11, 512GB de almacenamiento, 16GB RAM y pantalla FHD de 15,6 pulgadas.",
        
    },
    {
        id: 5,
        nombre: "Teclado Gamer Redragon Kumara",
        categoria: "Teclado",
        marca: "Redragon",
        precio: 49990,
        stock: 40,
        inalambrico: "No",
        color: "Negro",
        dimension: "75%",
        switch: "Mechanical Outemu Blue",
        imagen: "https://i.bolder.run/r/czozMjIxLGc6NjkweA/2d37a7fc/736207-Kumara1.png",
        descripcion: "La iluminación del Kumara K-552 RGB consta de teclas retroiluminadas configurables mediante software independiente.",
    },
    {
        id: 6,
        nombre: "Mouse Gamer inalámbrico Lenovo Legion M600",
        marca: "Lenovo",
        precio: 59990,
        stock: 30,
        inalambrico: true,
        color: "Negro",
        botonesCanti: 6,
        dpiMin: 200,
        dpiMax: 16000,
        imagen: "https://p4-ofp.static.pub//fes/cms/2025/05/22/bbh4okj51q0s8dnrsp89vypi3l1nmz317151.png",
        descripcion: "Conexión inalámbrica inferior a 1 ms mediante 2,4 GHz, o conexión mediante BT de baja latencia o USB-C con cable.",
  
    },
    {
        id: 7,
        nombre: "Audífonos Gamer Rgb Altec Lansing Gh9602",
        categoria: "Audífonos",
        marca: "Altec Lansing",
        precio: 30990,
        stock: 50,
        inalambrico: "No",
        color: "Negro",
        botonesCanti: 3,
        imagen: "https://www.hites.com/dw/image/v2/BDPN_PRD/on/demandware.static/-/Sites-mastercatalog_HITES/default/dw64a8ce06/images/original/mkp/1017300180100/10173001801001_1.jpg?sw=1000&sh=1000",
        descripcion: "Los audífonos Gamers de Altec Lansing ALGH9602 con USB 7.1 son flexibles y están diseñados para durar.",
    },
    {
        id: 8,
        nombre: "Audifonos Gamer Kraken V4 X negro",
        categoria: "Audífonos",
        marca: "Razer",
        precio: 89990,
        stock: 30,
        inalambrico: "No",
        imagen: "https://http2.mlstatic.com/D_NQ_NP_658376-MLA82145082160_022025-O.webp",
        descripcion: "Audio envolvente 7.1 para inmersión total en juegos. Almohadillas ovaladas de piel sintética para comodidad y aislamiento.",
    },
    {
        id: 9,
        nombre: "Teclado Mecanico Gamer RK Royal Kludge R65",
        categoria: "Teclado",
        marca: "Royal Kludge",
        precio: 69990,
        stock: 20,
        inalambrico: "Si",
        color: "Negro", 
        dimension: "65%",
        switch: "Mechanical RK Blue",
        imagen: "https://www.chilegatillos.cl/cdn/shop/files/TecladoRKRoyalKludgeR65chilegatillos.cl.jpg?v=1717042966&width=2048",
        descripcion: "Diseñado para gamers y creadores que buscan control total y rendimiento insuperable. Ideal para aficionados, semiprofesionales y profesionales.",
    }
];
// Exportación nueva para usar en componentes
export const productos = productosData;

// PEDIDOS DE CLIENTES DE EJEMPLO
// Tabla pedidos falsa en panel de admin.
export const pedidos = [
  { id: 2024001, cliente: 'Bastian Muñoz', fecha: '2025-10-12', estado: 'Procesando', total: 129990 },
  { id: 2024002, cliente: 'Javiera Gonzalez', fecha: '2025-10-11', estado: 'Enviado', total: 1949980 },
  { id: 2024003, cliente: 'Matias Rojas', fecha: '2025-10-12', estado: 'Pendiente', total: 49990 },
  { id: 2024004, cliente: 'Carla Nuñez', fecha: '2025-10-10', estado: 'Entregado', total: 649990 }
];