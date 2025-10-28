window.addEventListener('load', ()=>{

const form = document.getElementById('formulario')
const nombre = document.getElementById('nombre')
const telefono = document.getElementById('telefono')
const mail = document.getElementById('mail')
const rut = document.getElementById('rut')
const nacimiento = document.getElementById('nacimiento')
const direccion = document.getElementById('direccion')

form.addEventListener('submit', (e) =>{
    e.preventDefault()
    validacionCampos()
})

const validacionCampos = ()=>{
    const nombreValor = nombre.value.trim()
    const telefonoValor = telefono.value.trim()
    const mailValor = mail.value.trim()
    const rutValor = rut.value.trim()
    const nacimientoValor = nacimiento.value.trim()
    const direccionValor = direccion.value.trim()
    
    if (nombreValor === ''){
        validaFalla(nombre, 'campo vacio')
    } else {
        validaBien(nombre)        
    }

    if (telefonoValor === ''){
        validaFalla(telefono, 'campo vacio')
    } else if(validaTelefono(telefonoValor) === false){
        validaFalla(telefono, 'el telefono no es valido')
    }else {
        validaBien(telefono)        
    }  

    if(mailValor === ''){
        validaFalla(mail, 'campo vacio');
    } else if(!validaMail(mailValor)){
    validaFalla(mail, 'el mail no es valido');
    } else if(validaDuoc(mailValor)){
        validaFalla(mail, 'ha ingresado con un mail DUOC');
    } else {
        validaBien(mail);
    }
    
    if (rutValor === ''){
        validaFalla(rut, 'campo vacio')
    }else if (validaRut(rutValor) == false){
        validaFalla(rut, 'el rut no es valido')
    } else {
        validaBien(rut)        
    }  

    if (nacimientoValor === ''){
        validaFalla(nacimiento, 'campo vacio')
    } else {
        validaBien(nacimiento)        
    }  

    if (direccionValor === ''){
        validaFalla(direccion, 'campo vacio')
    } else {
        validaBien(direccion)        
    }  
    
}

const validaFalla = (input, msg)=>{
    const formControlador = input.parentElement
    const aviso =formControlador.querySelector('p')
    aviso.innerText = msg

    formControlador.className = 'form-controlador falla'
}

const validaBien = (input)=>{
    const formControlador = input.parentElement
    formControlador.className = 'form-controlador bien'
}

const validaTelefono = (telefono) => {
    return /^\+569\d{8}$/.test(telefono);
}

const validaMail = (mail) => {
    return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(mail);
}

const validaDuoc = (mail) => {
    return /^[a-zA-Z0-9._%+-]+@duocuc.cl$/.test(mail);
}

const validaRut = (rut) => {
    return /^0-9$/.test(rut);
}
});