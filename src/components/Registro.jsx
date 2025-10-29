function Registro() {
    return (
        <>
            {/* book section */}
            <section className="book_section layout_padding">
                <div className="container">
                    <div className="heading_container text_center">
                        <h2 style={{color: 'white'}}>
                            Registrate para ordenar
                        </h2>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="form_container">
                                <form id="formulario" action>
                                    <div className="form-controlador">
                                        <label htmlFor="nombre" style={{color: 'white'}}>Nombre</label>
                                        <input id="nombre" type="text" className="form-controlador form-control" />
                                        <p />
                                    </div>
                                    <div className="form-controlador">
                                        <label htmlFor="telefono" style={{color: 'white'}}>Numero de telefono</label>
                                        <input id="telefono" type="tel" className="form-controlador form-control" />
                                        <p />
                                    </div>
                                    <div className="form-controlador">
                                        <label htmlFor="mail" style={{color: 'white'}}>Email</label>
                                        <input id="mail" type="email" className="form-control" />
                                        <p />
                                    </div>
                                    <div className="form-controlador">
                                        <label htmlFor="rut" style={{color: 'white'}}>Rut (12.345.678-9)</label>
                                        <input id="rut" type="text" className="form-control" />
                                        <p />
                                    </div>
                                    <div className="form-controlador">
                                        <label htmlFor="nacimiento" style={{color: 'white'}}>Fecha de nacimiento</label>
                                        <input id="nacimiento" type="date" className="form-control" />
                                        <p />
                                    </div>
                                    <div className="form-controlador">
                                        <label htmlFor="direccion" style={{color: 'white'}}>Dirección</label>
                                        <input id="direccion" type="text" className="form-control" />
                                        <p />
                                    </div>
                                    <div className="btn_box">
                                        <button>
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