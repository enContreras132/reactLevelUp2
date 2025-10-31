import { useState } from 'react';
import { validaTelefono, validaMail, validaDuoc, validaRut } from './validaciones.js';

export function useFormValidation(initialValues) {
    const [formData, setFormData] = useState(initialValues);
    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});

    // Validar campo individual
    const validateField = (name, value) => {
        let error = '';

        switch (name) {
            case 'nombre':
                if (value === '') error = 'campo vacio';
                break;
            case 'telefono':
                if (value === '') {
                    error = 'campo vacio';
                } else if (!validaTelefono(value)) {
                    error = 'el telefono no es valido';
                }
                break;
            case 'mail':
                if (value === '') {
                    error = 'campo vacio';
                } else if (!validaMail(value)) {
                    error = 'el mail no es valido';
                } else if (validaDuoc(value)) {
                    error = 'ha ingresado con un mail DUOC';
                }
                break;
            case 'rut':
                if (value === '') {
                    error = 'campo vacio';
                } else if (!validaRut(value)) {
                    error = 'el rut no es valido';
                }
                break;
            case 'nacimiento':
                if (value === '') error = 'campo vacio';
                break;
            case 'direccion':
                if (value === '') error = 'campo vacio';
                break;
            case 'identifier':
                if (value === '') error = 'campo vacio';
                break;
            case 'password':
                if (value === '') error = 'campo vacio';
                break;
            default:
                break;
        }

        return error;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        if (touched[name]) {
            const error = validateField(name, value);
            setErrors({ ...errors, [name]: error });
        }
    };

    const handleBlur = (e) => {
        const { name, value } = e.target;
        setTouched({ ...touched, [name]: true });
        const error = validateField(name, value);
        setErrors({ ...errors, [name]: error });
    };

    const validateAllFields = () => {
        const allTouched = Object.keys(formData).reduce((acc, key) => {
            acc[key] = true;
            return acc;
        }, {});
        setTouched(allTouched);

        const newErrors = {};
        let hasErrors = false;

        Object.keys(formData).forEach((key) => {
            const error = validateField(key, formData[key]);
            newErrors[key] = error;
            if (error) hasErrors = true;
        });

        setErrors(newErrors);
        return !hasErrors;
    };

    const getFieldClass = (fieldName) => {
        if (!touched[fieldName]) return 'form-controlador';
        return errors[fieldName] ? 'form-controlador falla' : 'form-controlador bien';
    };

    const resetForm = () => {
        setFormData(initialValues);
        setErrors({});
        setTouched({});
    };

    return {
        formData,
        errors,
        touched,
        handleChange,
        handleBlur,
        validateAllFields,
        getFieldClass,
        resetForm
    };
}
