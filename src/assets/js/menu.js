const API_BASE_URL = "http://localhost:8080";
const categorias = ["mouse", "teclado", "notebook", "audifono"];

async function obtenerProductos(tipo) {
  try {
    const res = await fetch(`${API_BASE_URL}/${tipo}`);
    if (!res.ok) throw new Error(`Error al obtener ${tipo}`);
    const productos = await res.json();
    renderizarProductos(productos, tipo);
  } catch (error) {
    console.error(error);
    document.querySelector("#productos").innerHTML += `
      <p style="color:white;">Error cargando ${tipo}</p>`;
  }
}

function renderizarProductos(lista, tipo) {
  const contenedor = document.querySelector("#productos");

  // Título de categoría
  const titulo = document.createElement("div");
  titulo.className = "heading_container heading_center";
  titulo.innerHTML = `<h2>${tipo.charAt(0).toUpperCase() + tipo.slice(1)}</h2>`;
  contenedor.appendChild(titulo);

  // Grilla de productos
  const grid = document.createElement("div");
  grid.className = "row";

  lista.forEach((p) => {
    const box = document.createElement("div");
    box.className = "col-sm-6 col-lg-4 all";

    box.innerHTML = `
      <div class="box">
        <div class="img-box">
          <img src="${p.urlImagen}" alt="${p.nombre}">
        </div>
        <div class="detail-box">
          <h5>${p.nombre}</h5>
          <h6>$${p.precio.toLocaleString()}</h6>
        </div>
      </div>
    `;

    grid.appendChild(box);
  });

  contenedor.appendChild(grid);
}

// Cargar todas las categorías al iniciar
categorias.forEach(obtenerProductos);
