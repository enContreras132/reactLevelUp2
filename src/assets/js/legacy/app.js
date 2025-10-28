    const btnSearch = document.getElementById('btnSearch');
    const dropdown = document.getElementById('dropdownContent');
    const searchInput = document.getElementById('searchInput');
    const resultsList = document.getElementById('resultsList');

    const items = [
      'Mouse Gamer Monster RGB','Audifonos Gamer Monster','Mouse Razer Cobra Pro HyperSpeed','Gamer Nitro V15 RTX 2050','Laptop','Mousepad','Parlante'
    ];

    // Mostrar/ocultar dropdown al hacer click en el botón
    btnSearch.addEventListener('click', () => {
      dropdown.classList.toggle('show');
      if (dropdown.classList.contains('show')) {
        searchInput.focus();
        filterItems(''); // mostrar todos al abrir
      }
    });

    // Filtrar resultados según input
    function filterItems(query) {
      resultsList.innerHTML = '';
      const filtered = items.filter(item =>
        item.toLowerCase().includes(query.toLowerCase())
      );
      if (filtered.length === 0) {
        const li = document.createElement('li');
        li.className = 'list-group-item';
        li.textContent = 'No hay resultados';
        resultsList.appendChild(li);
        return;
      }
      filtered.forEach(item => {
        const li = document.createElement('li');
        li.className = 'list-group-item list-group-item-action';
        li.textContent = item;
        li.style.cursor = 'pointer';
        li.addEventListener('click', () => {
          alert('Seleccionaste: ' + item);
          dropdown.classList.remove('show');
        });
        resultsList.appendChild(li);
      });
    }

    searchInput.addEventListener('input', e => {
      filterItems(e.target.value);
    });

    // Cerrar dropdown si se hace click fuera
    document.addEventListener('click', e => {
      if (!btnSearch.contains(e.target) && !dropdown.contains(e.target)) {
        dropdown.classList.remove('show');
      }
    });