// Funciones de validación migradas desde custom.js

export const validaTelefono = (telefono) => {
    return /^\+569\d{8}$/.test(telefono);
};

export const validaMail = (mail) => {
    return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(mail);
};

export const validaDuoc = (mail) => {
    return /^[a-zA-Z0-9._%+-]+@duocuc\.cl$/.test(mail);
};

export const validaRut = (rut) => {
    // Nota: La regex original /^0-9$/ solo valida el string "0-9" literal
    // Aquí una validación mejorada para RUT chileno formato: 12345678-9
    return /^\d{7,8}-[\dkK]$/.test(rut);
};
