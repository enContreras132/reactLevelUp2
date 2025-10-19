import React, { useState } from 'react';
// Importa tu CSS si es necesario, por ejemplo:
// import './Formulario.css'; 

// --- Tus funciones de validación ---
// Las ponemos fuera del componente porque no dependen de nada de React
// (Estas son tus mismas funciones, solo las copié y pegué)
const validaTelefono = (telefono) => {
    return /^\+569\d{8}$/.test(telefono);
}

const validaMail = (mail) => {
    return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(mail);
}

const validaDuoc = (mail) => {
    return /^[a-zA-Z0-9._%+-]+@duocuc.cl$/.test(mail);
}

// Ojo: Esta función de validación de RUT parece incorrecta, 
// /^0-9$/ solo valida un dígito. Deberías revisarla, 
// pero mantengo tu lógica original para el ejemplo.
const validaRut = (rut) => {
    return /^0-9$/.test(rut);
}

// --- Tu Componente de React ---
function FormularioRegistro() {

    // 1. ESTADO: En lugar de buscar en el DOM, guardamos los valores aquí.
    // Usamos un objeto para guardar todos los datos del formulario.
    const [formData, setFormData] = useState({
        nombre: '',
        telefono: '',
        mail: '',
        rut: '',
        nacimiento: '',
        direccion: ''
    });

    // 2. ESTADO DE ERRORES: También guardamos los errores en el estado.
    const [errors, setErrors] = useState({});

    // 3. MANEJADOR DE CAMBIOS: Esta función actualiza el estado CADA VEZ que el usuario teclea.
    // Esto se llama "Controlled Component" (Componente Controlado).
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    // 4. LÓGICA DE VALIDACIÓN: Esta es tu función "validacionCampos", pero adaptada a React.
    // No modifica el DOM, solo LEE el estado "formData" y DEVUELVE un objeto de errores.
    const validateForm = () => {
        const { nombre, telefono, mail, rut, nacimiento, direccion } = formData;
        const newErrors = {}; // Un objeto temporal para guardar los errores

        // Nombre
        if (nombre.trim() === '') {
            newErrors.nombre = 'campo vacio';
        }

        // Teléfono
        if (telefono.trim() === '') {
            newErrors.telefono = 'campo vacio';
        } else if (!validaTelefono(telefono.trim())) {
            newErrors.telefono = 'el telefono no es valido';
        }

        // Mail
        if (mail.trim() === '') {
            newErrors.mail = 'campo vacio';
        } else if (!validaMail(mail.trim())) {
            newErrors.mail = 'el mail no es valido';
        } else if (validaDuoc(mail.trim())) {
            newErrors.mail = 'ha ingresado con un mail DUOC';
        }

        // Rut
        if (rut.trim() === '') {
            newErrors.rut = 'campo vacio';
        } else if (!validaRut(rut.trim())) { // (Usando tu validación original)
            newErrors.rut = 'el rut no es valido';
        }

        // Nacimiento
        if (nacimiento.trim() === '') {
            newErrors.nacimiento = 'campo vacio';
        }
        
        // Dirección
        if (direccion.trim() === '') {
            newErrors.direccion = 'campo vacio';
        }

        return newErrors;
    };

    // 5. MANEJADOR DE SUBMIT: Esto se ejecuta cuando se envía el formulario.
    const handleSubmit = (e) => {
        e.preventDefault(); // Esto sigue siendo igual: previene que la página recargue.
        
        // Primero, validamos
        const formErrors = validateForm();
        
        // Actualizamos el estado de errores
        setErrors(formErrors);

        // Si el objeto de errores está vacío (Object.keys(...).length === 0), el formulario es válido
        if (Object.keys(formErrors).length === 0) {
            console.log('Formulario válido, enviando datos:', formData);
            // AQUÍ ES DONDE ENVIARÍAS LOS DATOS a tu API o backend (con fetch, axios, etc.)
        } else {
            console.log('Formulario inválido, revisa los errores');
        }
    };

    // 6. EL JSX (HTML): Así se "dibuja" el formulario.
    // Fíjate cómo el `className` y el mensaje de error <p> dependen del estado "errors".
    return (
        <form id="formulario" onSubmit={handleSubmit} noValidate>
            
            {/* Campo Nombre */}
            {/* Las funciones `validaFalla` y `validaBien` desaparecen. */}
            {/* Ahora, la clase se aplica CONDICIONALMENTE. */}
            <div className={`form-controlador ${errors.nombre ? 'falla' : ''}`}>
                <label htmlFor="nombre">Nombre</label>
                <input
                    type="text"
                    id="nombre"
                    name="nombre" // 'name' es crucial para que 'handleChange' funcione
                    value={formData.nombre} // El valor lo controla React
                    onChange={handleChange} // La función que actualiza el estado
                />
                {/* El párrafo de error solo se muestra SI existe un error para 'nombre' */}
                {errors.nombre && <p>{errors.nombre}</p>}
            </div>

            {/* Campo Teléfono */}
            <div className={`form-controlador ${errors.telefono ? 'falla' : ''}`}>
                <label htmlFor="telefono">Teléfono</label>
                <input
                    type="tel"
                    id="telefono"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleChange}
                    placeholder="+569..."
                />
                {errors.telefono && <p>{errors.telefono}</p>}
            </div>

            {/* Campo Mail */}
            <div className={`form-controlador ${errors.mail ? 'falla' : ''}`}>
                <label htmlFor="mail">Email</label>
                <input
                    type="email"
                    id="mail"
                    name="mail"
                    value={formData.mail}
                    onChange={handleChange}
                />
                {errors.mail && <p>{errors.mail}</p>}
            </div>

            {/* Campo RUT */}
            <div className={`form-controlador ${errors.rut ? 'falla' : ''}`}>
                <label htmlFor="rut">RUT</label>
                <input
                    type="text"
                    id="rut"
                    name="rut"
                    value={formData.rut}
                    onChange={handleChange}
                />
                {errors.rut && <p>{errors.rut}</p>}
            </div>

            {/* Campo Nacimiento */}
            <div className={`form-controlador ${errors.nacimiento ? 'falla' : ''}`}>
                <label htmlFor="nacimiento">Fecha de Nacimiento</label>
                <input
                    type="date"
                    id="nacimiento"
                    name="nacimiento"
                    value={formData.nacimiento}
                    onChange={handleChange}
                />
                {errors.nacimiento && <p>{errors.nacimiento}</p>}
            </div>

            {/* Campo Dirección */}
            <div className={`form-controlador ${errors.direccion ? 'falla' : ''}`}>
                <label htmlFor="direccion">Dirección</label>
                <input
                    type="text"
                    id="direccion"
                    name="direccion"
                    value={formData.direccion}
                    onChange={handleChange}
                />
                {errors.direccion && <p>{errors.direccion}</p>}
            </div>

            <button type="submit">Enviar</button>
        </form>
    );
}

export default FormularioRegistro;