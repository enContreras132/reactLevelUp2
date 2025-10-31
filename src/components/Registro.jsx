import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormValidation } from '../utils/useFormValidation.js';

function Registro() {
    const navigate = useNavigate();
    const {
        formData,
        errors,
        touched,
        handleChange,
        handleBlur,
        validateAllFields,
        getFieldClass,
        resetForm
    } = useFormValidation({
        nombre: '',
        telefono: '',
        mail: '',
        rut: '',
        nacimiento: '',
        direccion: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        if (validateAllFields()) {
            console.log('Formulario válido:', formData);
            alert('Formulario enviado correctamente');
            // Aquí puedes hacer el POST a tu API
            // resetForm(); // Descomentar si quieres limpiar el form después de enviar
        }
    };

    return (
        <>
            {/* book section */}
            <section className="book_section layout_padding">
                <div className="container position-relative">

                    <div className="heading_container text_center">
                        <h2 style={{color: 'white'}}>
                            Registrate para ordenar
                        </h2>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="form_container">
                                <form id="formulario" onSubmit={handleSubmit}>
                                    <div className={getFieldClass('nombre')}>
                                        <label htmlFor="nombre" style={{color: 'white'}}>Nombre</label>
                                        <input 
                                            id="nombre" 
                                            name="nombre"
                                            type="text" 
                                            className="form-control" 
                                            value={formData.nombre}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                        {touched.nombre && errors.nombre && <p style={{color: 'white', backgroundColor: 'black'}}>{errors.nombre}</p>}
                                    </div>
                                    <div className={getFieldClass('telefono')}>
                                        <label htmlFor="telefono" style={{color: 'white'}}>Numero de telefono</label>
                                        <input 
                                            id="telefono" 
                                            name="telefono"
                                            type="tel" 
                                            className="form-control" 
                                            placeholder="+56912345678"
                                            value={formData.telefono}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                        {touched.telefono && errors.telefono && <p style={{color: 'white', backgroundColor: 'black'}}>{errors.telefono}</p>}
                                    </div>
                                    <div className={getFieldClass('mail')}>
                                        <label htmlFor="mail" style={{color: 'white'}}>Email</label>
                                        <input 
                                            id="mail" 
                                            name="mail"
                                            type="email" 
                                            className="form-control" 
                                            value={formData.mail}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                        {touched.mail && errors.mail && <p style={{color: 'white', backgroundColor: 'black'}}>{errors.mail}</p>}
                                    </div>
                                    <div className={getFieldClass('rut')}>
                                        <label htmlFor="rut" style={{color: 'white'}}>Rut (12345678-9)</label>
                                        <input 
                                            id="rut" 
                                            name="rut"
                                            type="text" 
                                            className="form-control" 
                                            placeholder="12345678-9"
                                            value={formData.rut}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                        {touched.rut && errors.rut && <p style={{color: 'white', backgroundColor: 'black'}}>{errors.rut}</p>}
                                    </div>
                                    <div className={getFieldClass('nacimiento')}>
                                        <label htmlFor="nacimiento" style={{color: 'white'}}>Fecha de nacimiento</label>
                                        <input 
                                            id="nacimiento" 
                                            name="nacimiento"
                                            type="date" 
                                            className="form-control" 
                                            value={formData.nacimiento}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                        {touched.nacimiento && errors.nacimiento && <p style={{color: 'white', backgroundColor: 'black'}}>{errors.nacimiento}</p>}
                                    </div>
                                    <div className={getFieldClass('direccion')}>
                                        <label htmlFor="direccion" style={{color: 'white'}}>Dirección</label>
                                        <input 
                                            id="direccion" 
                                            name="direccion"
                                            type="text" 
                                            className="form-control" 
                                            value={formData.direccion}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                        {touched.direccion && errors.direccion && <p style={{color: 'white', backgroundColor: 'black'}}>{errors.direccion}</p>}
                                    </div>
                                    <div className="btn_box">
                                        <button type="submit">
                                            Registrarme
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* end book section */}
        </>
    );
}
export default Registro;