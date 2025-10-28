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
        precio: 7590,
        imagen: "https://i.bolder.run/r/czozMjIxLGc6NjkweA/477efa0d/711248-Mouse_B1.png",
        descripcion: "Mouse Gamer Monster con DPI: 800/1600/2400/3200/4000/8000, RGB, Cable trenzado de 1.5m y 6 Botones.",
        caracteristicas: [
            "DPI: 800/1600/2400/3200/4000/8000",
            "Iluminación RGB",
            "Cable trenzado (1.5m)",
            "6 Botones",
            "Botón para modificar luces"
        ],
        caja_incluye: [
            "Mouse Gamer Monster RGB",
            "Manual de usuario"
        ]
    },
    {
        id: 2,
        nombre: "Audifonos Gamer Monster",
        precio: 5990,
        imagen: "https://i.bolder.run/r/czozMjIxLGc6NjkweA/424c2d92/710300-1_%283%29.png",
        descripcion: "Audífonos Gamer Monster Loud 550BK. Formato Headset, con micrófono, compatible con Ps4 / Nswitch / X-one.",
        caracteristicas: [
            "Marca: Monster",
            "Línea: Loud",
            "Modelo: 550BK",
            "Formato del audífono: Headset",
            "Con micrófono: Sí",
            "Es gamer: Sí",
            "Con luz LED: No"
        ],
        caja_incluye: [
            "Audifonos Gamer Monster",
            "Cable adaptador para PC"
        ]
    },
    {
        id: 3,
        nombre: "Mouse Razer Cobra Pro HyperSpeed",
        precio: 124640,
        imagen: "https://www.winpy.cl/files/w38389_razer_cobra_pro_hyperspeed_00.jpg",
        descripcion: "Ratón gaming inalámbrico y ergonómico con iluminación Razer Chroma™ RGB y tecnología HyperSpeed.",
        caracteristicas: [
            "Sensor óptico Focus Pro de 30 000 PPP",
            "Switches ópticos para ratón Razer™ de 3.ª gen",
            "Diseño ligero de 77 g",
            "Conectividad inalámbrica y Bluetooth"
        ],
        caja_incluye: [
            "Mouse Razer Cobra Pro",
            "Dongle inalámbrico HyperSpeed",
            "Cable Speedflex USB tipo A a USB tipo C",
            "Guía de información importante del producto"
        ]
    },
    {
        id: 4,
        nombre: "Gamer Nitro V15 RTX 2050",
        precio: 699990,
        imagen: "https://www.acerstore.cl/cdn/shop/files/1_ANV15-51-53W1-1.png?v=1753392522&width=533",
        descripcion: "Notebook gamer con Windows 11, 512GB de almacenamiento, 16GB RAM y pantalla FHD de 15,6 pulgadas.",
        caracteristicas: [
            "NVIDIA® GeForce RTX™ 2050",
            "Procesador Intel® Core™ i5 Octa Core",
            "Pantalla 15.6\" Full HD 1920 x 1080",
            "16 GB RAM",
            "512GB Almacenamiento SSD"
        ],
        caja_incluye: [
            "Notebook Gamer Nitro V15",
            "Cargador de corriente"
        ]
    },
    {
        id: 5,
        nombre: "Teclado Gamer Redragon Kumara",
        precio: 49990,
        imagen: "https://i.bolder.run/r/czozMjIxLGc6NjkweA/2d37a7fc/736207-Kumara1.png",
        descripcion: "La iluminación del Kumara K-552 RGB consta de teclas retroiluminadas configurables mediante software independiente.",
        caracteristicas: [
            "Formato: TKL (Tenkeyless)",
            "Retroiluminación: RGB configurable por software",
            "Memoria interna para perfiles",
            "Construcción robusta"
        ],
        caja_incluye: [
            "Teclado Redragon Kumara K-552",
            "Manual de usuario"
        ]
    },
    {
        id: 6,
        nombre: "Mouse Gamer inalámbrico Lenovo Legion M600",
        precio: 59990,
        imagen: "https://p4-ofp.static.pub//fes/cms/2025/05/22/bbh4okj51q0s8dnrsp89vypi3l1nmz317151.png",
        descripcion: "Conexión inalámbrica inferior a 1 ms mediante 2,4 GHz, o conexión mediante BT de baja latencia o USB-C con cable.",
        caracteristicas: [
            "Conexión inalámbrica 2.4 GHz (< 1ms)",
            "Conexión Bluetooth de baja latencia",
            "Hasta 200 horas de batería (luces apagadas)",
            "Carga rápida"
        ],
        caja_incluye: [
            "Mouse Lenovo Legion M600",
            "Cable USB-C",
            "Dongle inalámbrico"
        ]
    },
    {
        id: 7,
        nombre: "Audífonos Gamer Rgb Altec Lansing Gh9602",
        precio: 30990,
        imagen: "https://www.hites.com/dw/image/v2/BDPN_PRD/on/demandware.static/-/Sites-mastercatalog_HITES/default/dw64a8ce06/images/original/mkp/1017300180100/10173001801001_1.jpg?sw=1000&sh=1000",
        descripcion: "Los audífonos Gamers de Altec Lansing ALGH9602 con USB 7.1 son flexibles y están diseñados para durar.",
        caracteristicas: [
            "Sonido 7.1 USB",
            "Diseño flexible y duradero",
            "Materiales de alta calidad",
            "Diseño ultra cómodo",
            "Iluminación RGB"
        ],
        caja_incluye: [
            "Audífonos Altec Lansing Gh9602",
            "Manual de usuario"
        ]
    },
    {
        id: 8,
        nombre: "Audifonos Gamer Kraken V4 X negro",
        precio: 89990,
        imagen: "https://http2.mlstatic.com/D_NQ_NP_658376-MLA82145082160_022025-O.webp",
        descripcion: "Audio envolvente 7.1 para inmersión total en juegos. Almohadillas ovaladas de piel sintética para comodidad y aislamiento.",
        caracteristicas: [
            "Audio envolvente 7.1",
            "Cancelación de ruido",
            "Longitud de cable de 2 m",
            "Almohadillas ovaladas de piel sintética",
            "Micrófono con patrón de captación mejorado"
        ],
        caja_incluye: [
            "Audifonos Gamer Kraken V4 X",
            "Manual de usuario"
        ]
    },
    {
        id: 9,
        nombre: "Teclado Mecanico Gamer RK Royal Kludge R65",
        precio: 69990,
        imagen: "https://www.chilegatillos.cl/cdn/shop/files/TecladoRKRoyalKludgeR65chilegatillos.cl.jpg?v=1717042966&width=2048",
        descripcion: "Diseñado para gamers y creadores que buscan control total y rendimiento insuperable. Ideal para aficionados, semiprofesionales y profesionales.",
        caracteristicas: [
            "Formato 65%",
            "Switches mecánicos de alta calidad",
            "Diseño para control total",
            "Rendimiento profesional"
        ],
        caja_incluye: [
            "Teclado RK Royal Kludge R65",
            "Cable USB-C",
            "Manual de usuario"
        ]
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