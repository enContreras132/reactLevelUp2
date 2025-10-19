import React, { useState, useEffect, useRef } from 'react';

// --- Tus datos (pueden estar aquí o importados de data.js) ---
const items = [
    'Mouse Gamer Monster RGB',
    'Audifonos Gamer Monster',
    'Mouse Razer Cobra Pro HyperSpeed',
    'Gamer Nitro V15 RTX 2050',
    'Laptop',
    'Mousepad',
    'Parlante'
];

function SearchDropdown() {
    // --- ESTADO ---
    // 1. Para saber si el dropdown está abierto o cerrado
    const [isOpen, setIsOpen] = useState(false);
    // 2. Para guardar lo que el usuario está escribiendo
    const [searchTerm, setSearchTerm] = useState('');

    // --- REFS ---
    // Las "Refs" son para "tocar" elementos del DOM directamente (como hacer focus o ver si hice clic afuera)
    const wrapperRef = useRef(null); // Referencia al contenedor principal del buscador
    const inputRef = useRef(null);   // Referencia al input

    
    // --- LÓGICA DE FILTRADO ---
    // Esto no necesita ser un estado. Se "calcula" cada vez que el componente se renderiza.
    const filteredItems = items.filter(item =>
        item.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // --- MANEJADORES DE EVENTOS ---
    
    // Se ejecuta al hacer clic en el botón principal
    const handleToggle = () => {
        setIsOpen(prevIsOpen => !prevIsOpen); // Invierte el estado (abrir/cerrar)
    };
    
    // Se ejecuta al hacer clic en un item de la lista
    const handleItemClick = (item) => {
        alert('Seleccionaste: ' + item);
        setIsOpen(false); // Cierra el dropdown
        setSearchTerm(''); // Limpia la búsqueda
    };

    // --- EFECTOS (useEffect) ---
    // Este código se ejecuta "después" de que el componente se dibuja.
    // Es el reemplazo de los addEventListener globales.

    // Efecto 1: Poner FOCO en el input cuando se abre el dropdown
    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus(); // Esto es el reemplazo de searchInput.focus()
            setSearchTerm(''); // Limpia la búsqueda al abrir (como en tu código original)
        }
    }, [isOpen]); // Este array dice: "Ejecuta esto SÓLO si 'isOpen' cambia"

    // Efecto 2: Cerrar el dropdown si se hace clic AFUERA
    useEffect(() => {
        // Esta es la función que se ejecutará en cada clic
        function handleClickOutside(event) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setIsOpen(false); // Cierra el dropdown
            }
        }
        
        // Añade el listener al documento
        document.addEventListener('mousedown', handleClickOutside);
        
        // Función de "limpieza": se ejecuta cuando el componente se "desmonta"
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [wrapperRef]); // El array vacío [] significa "Ejecuta esto solo una vez, al montar"


    // --- RENDER (El JSX/HTML) ---
    // Tu HTML ahora es "declarativo". Muestra cosas SI el estado es `true`.
    return (
        // Usamos la Ref aquí para detectar el "clic afuera"
        <div className="search-container" ref={wrapperRef}>
            
            {/* 1. El Botón (reemplaza a btnSearch) */}
            <button id="btnSearch" onClick={handleToggle}>
                Buscar 🔍
            </button>

            {/* 2. El Dropdown (reemplaza a dropdownContent) */}
            {/* Esto es renderizado condicional: 
                "Si 'isOpen' es true, dibuja este div" */}
            {isOpen && (
                <div id="dropdownContent" className="dropdown-menu show">
                    
                    {/* 3. El Input (reemplaza a searchInput) */}
                    <input
                        ref={inputRef} // Conectamos la Ref para el focus
                        id="searchInput"
                        type="text"
                        className="form-control"
                        placeholder="Buscar..."
                        value={searchTerm} // El valor está "controlado" por el estado
                        onChange={e => setSearchTerm(e.target.value)} // El estado se actualiza al teclear
                    />
                    
                    {/* 4. La Lista (reemplaza a resultsList) */}
                    <ul id="resultsList" className="list-group">
                        {/* Verificamos si hay resultados */}
                        {filteredItems.length > 0 ? (
                            // Usamos .map() para "dibujar" la lista
                            filteredItems.map((item, index) => (
                                <li
                                    key={index}
                                    className="list-group-item list-group-item-action"
                                    style={{ cursor: 'pointer' }}
                                    onClick={() => handleItemClick(item)} // Manejador de clic
                                >
                                    {item}
                                </li>
                            ))
                        ) : (
                            // Mensaje si no hay resultados
                            <li className="list-group-item">
                                No hay resultados
                            </li>
                        )}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default SearchDropdown;