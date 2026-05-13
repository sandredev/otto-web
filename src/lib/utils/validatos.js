export const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!email) {
        return {
            success: false,
            error: "El email es requerido"
        };
    }

    if (!emailRegex.test(email)) {
        return {
            success: false,
            error: "El email no es válido"
        };
    }

    return {
        success: true,
        message: "Email válido"
    };
};


import { VALIDACIONES } from "../constants";

export const validatePassword = (password) => {
    if (!password) {
        return {
            success: false,
            error: "La contraseña es requerida"
        };
    }

    if (password.length < VALIDACIONES.MIN_PASSWORD_LENGTH) {
        return {
            success: false,
            error: `La contraseña debe tener al menos ${VALIDACIONES.MIN_PASSWORD_LENGTH} caracteres`
        };
    }

    if (password.length > VALIDACIONES.MAX_PASSWORD_LENGTH) {
        return {
            success: false,
            error: `La contraseña no puede exceder ${VALIDACIONES.MAX_PASSWORD_LENGTH} caracteres`
        };
    }

   
    if (!/\d/.test(password)) {
        return {
            success: false,
            error: "La contraseña debe contener al menos un número"
        };
    }

    
    if (!/[A-Z]/.test(password)) {
        return {
            success: false,
            error: "La contraseña debe contener al menos una letra mayúscula"
        };
    }

    return {
        success: true,
        message: "Contraseña válida"
    };
};


export const validateUsername = (username) => {
    if (!username) {
        return {
            success: false,
            error: "El nombre de usuario es requerido"
        };
    }

    if (username.length < 3) {
        return {
            success: false,
            error: "El nombre de usuario debe tener al menos 3 caracteres"
        };
    }

    if (username.length > VALIDACIONES.MAX_USERNAME_LENGTH) {
        return {
            success: false,
            error: `El nombre de usuario no puede exceder ${VALIDACIONES.MAX_USERNAME_LENGTH} caracteres`
        };
    }

    // Solo letras, números y guiones bajos
    const usernameRegex = /^[a-zA-Z0-9_]+$/;
    if (!usernameRegex.test(username)) {
        return {
            success: false,
            error: "El nombre de usuario solo puede contener letras, números y guiones bajos"
        };
    }

    return {
        success: true,
        message: "Nombre de usuario válido"
    };
};

