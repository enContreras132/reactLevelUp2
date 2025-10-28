// Espera a que todo el HTML de la página se cargue
document.addEventListener('DOMContentLoaded', () => {

    // Referencias a los elementos del HTML en cart.html
    const carritoDiv = document.getElementById('carrito');
    const resumenDiv = document.getElementById('resumen');
    const vaciarBtn = document.getElementById('vaciarCarrito');
    const btnPagar = document.getElementById('btnPagar');

    // LA MAGIA OCURRE AQUÍ: Carga el carrito desde localStorage.
    // Si no hay nada, empieza con un arreglo vacío.
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    // Función para guardar el carrito en localStorage (la usaremos después)
    function guardarCarrito() {
        localStorage.setItem('carrito', JSON.stringify(carrito));
    }

    // Función para eliminar un producto del carrito
    function eliminarDelCarrito(nombreProducto) {
        carrito = carrito.filter(item => item.nombre !== nombreProducto);
        actualizarVistaDelCarrito(); // Vuelve a dibujar el carrito
    }

    // Función principal que dibuja el carrito en la pantalla
    function actualizarVistaDelCarrito() {
        carritoDiv.innerHTML = ''; // Limpia el carrito antes de volver a dibujarlo

        if (carrito.length === 0) {
            carritoDiv.innerHTML = '<p class="text-gray-400">Tu carrito está vacío.</p>';
            resumenDiv.textContent = '';
            vaciarBtn.style.display = 'none';
            btnPagar.style.display = 'none';
        } else {
            vaciarBtn.style.display = 'inline-block';
            btnPagar.style.display = 'inline-block';
            let totalGeneral = 0;

            carrito.forEach(item => {
                const subtotal = item.precio * item.cantidad;
                totalGeneral += subtotal;

                const itemDiv = document.createElement('div');
                // Este HTML es el que crea la fila de cada producto en el carrito
                itemDiv.className = 'flex items-center justify-between bg-gray-900 bg-opacity-50 p-3 rounded-lg';
                itemDiv.innerHTML = `
                    <div class="flex items-center space-x-4">
                        <img src="${item.imagen}" alt="${item.nombre}" class="w-16 h-12 rounded" />
                        <div>
                            <p class="font-semibold">${item.nombre}</p>
                            <p class="text-sm text-gray-400">Precio: $${item.precio.toLocaleString('es-CL')}</p>
                        </div>
                    </div>
                    <div class="flex items-center space-x-3">
                        <input type="number" min="1" value="${item.cantidad}" class="w-16 text-black rounded px-2 py-1" data-nombre="${item.nombre}" />
                        <p class="w-20 text-right font-semibold">$${subtotal.toLocaleString('es-CL')}</p>
                        <button class="text-red-500 font-bold text-xl eliminar-btn" data-nombre="${item.nombre}" title="Eliminar">&times;</button>
                    </div>
                `;
                carritoDiv.appendChild(itemDiv);
            });

            resumenDiv.textContent = `Total: $${totalGeneral.toLocaleString('es-CL')}`;
        }

        // Vuelve a guardar el estado actual del carrito por si se hicieron cambios
        guardarCarrito();
    }

    // --- EVENTOS DE LOS BOTONES ---

    // Evento para el botón "Vaciar Carrito"
    vaciarBtn.addEventListener('click', () => {
        if (confirm('¿Estás seguro de que quieres vaciar el carrito?')) {
            carrito = [];
            actualizarVistaDelCarrito();
        }
    });

    // Eventos para los botones de eliminar (X) y los inputs de cantidad
    carritoDiv.addEventListener('click', (e) => {
        // Si se hace clic en un botón de eliminar
        if (e.target.classList.contains('eliminar-btn')) {
            const nombreProducto = e.target.getAttribute('data-nombre');
            eliminarDelCarrito(nombreProducto);
        }
    });

    carritoDiv.addEventListener('input', (e) => {
        // Si se cambia la cantidad en un input
        if (e.target.type === 'number') {
            const nombreProducto = e.target.getAttribute('data-nombre');
            const nuevaCantidad = parseInt(e.target.value);
            const producto = carrito.find(item => item.nombre === nombreProducto);

            if (producto && nuevaCantidad > 0) {
                producto.cantidad = nuevaCantidad;
                actualizarVistaDelCarrito();
            }
        }
    });

    
    // Al cargar la página, llama a la función para que muestre lo que hay guardado.
    actualizarVistaDelCarrito();
});