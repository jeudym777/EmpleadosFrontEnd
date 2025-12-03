import { APP_CONSTANTS } from '../constants';

/**
 * Utilidades para validación de datos
 */
export class Validator {
    /**
     * Valida un email
     */
    static isValidEmail(email: string): boolean {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    /**
     * Valida la edad
     */
    static isValidAge(edad: number): boolean {
        return edad >= APP_CONSTANTS.VALIDATION.MIN_AGE && 
               edad <= APP_CONSTANTS.VALIDATION.MAX_AGE;
    }

    /**
     * Valida el código de empleado
     */
    static isValidCodEmpleado(codigo: string): boolean {
        return codigo.length > 0 && 
               codigo.length <= APP_CONSTANTS.VALIDATION.COD_EMPLEADO_MAX_LENGTH;
    }

    /**
     * Valida que un string no esté vacío
     */
    static isNotEmpty(value: string): boolean {
        return value.trim().length > 0;
    }
}
